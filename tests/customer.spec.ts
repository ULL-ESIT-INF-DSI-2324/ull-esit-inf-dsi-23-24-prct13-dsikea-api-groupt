import request from "supertest";
import { app } from "../src/index.js";
import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import { Customer } from '../src/models/customers.js';
import { connectDB, closeDB } from '../src/db/database.js';
import mongoose from 'mongoose';

const firstCustomer = {
  name: "John",
  surname: "Doe",
  nif: "11111111A",
  genre: 'male'
};

const secondCustomer = {
  name: "Jane",
  surname: "Doe",
  nif: "11111111B",
  genre: 'female'
};

const thirdCustomer = {
  name: "Jim",
  surname: "Beam",
  nif: "11111111C",
  genre: 'male'
};

// Hooks
before(async function () {
  this.timeout(30000); // Aumenta el tiempo de espera para el hook `before`
  await connectDB();
});

after(async function () {
  this.timeout(30000); // Aumenta el tiempo de espera para el hook `after`
  await closeDB();
});

beforeEach(async () => {
  await Customer.deleteMany();
  await new Customer(firstCustomer).save();
  await new Customer(secondCustomer).save();
  await new Customer(thirdCustomer).save();
});

afterEach(async () => {
  await Customer.deleteMany();
});

// Tests
describe('GET /customers', () => {
  it('Should return all customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(3);
  });

  it('Should return a customer with a specific nif', async () => {
    const res = await request(app).get(`/customers/${firstCustomer.nif}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('nif', firstCustomer.nif);
  });

  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).get('/customers/12345678A');
    expect(res.status).to.equal(404);
  });
});

describe('POST /customers', () => {
  it('Should save a customer in the database', async () => {
    const customer = {
      name: "Mary",
      surname: "Poppins",
      nif: "11111111D",
      genre: 'female'
    };
    const res = await request(app).post('/customers').send(customer);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('nif', customer.nif);
  });

  it('Should return a 500 error if the customer already exists', async () => {
    const res = await request(app).post('/customers').send(firstCustomer);
    expect(res.status).to.equal(500);
  });
});

describe('PATCH /customers', () => {
  it('Should update a customer in the database', async () => {
    const res = await request(app).patch(`/customers/${firstCustomer.nif}`).send({ genre: 'female' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('genre', 'female');
  });

  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).patch('/customers/12345678A').send({ genre: 'female' });
    expect(res.status).to.equal(404);
  });
});

describe('DELETE /customers', () => {
  it('Should delete a customer from the database', async () => {
    const res = await request(app).delete(`/customers/${firstCustomer.nif}`);
    expect(res.status).to.equal(200);
    const deletedCustomer = await Customer.findOne({ nif: firstCustomer.nif });
    expect(deletedCustomer).to.be.null;
  });

  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).delete('/customers/12345678A');
    expect(res.status).to.equal(404);
  });
});

describe('Customer Schema', () => {
  it('Should return an error if the NIF of a customer is empty', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '' });
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });

  it('Should return an error if the NIF of a customer does not have 9 characters', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '12345678' });
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });

  it('Should return an error if the NIF of a customer does not have a valid format', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '12345678a' }); 
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });
});