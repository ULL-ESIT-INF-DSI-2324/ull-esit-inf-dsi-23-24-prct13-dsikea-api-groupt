import "mocha";
import { expect } from "chai";
import request from "supertest";
import { app } from "../src/index.js";
import { Customer } from '../src/models/customers.js';
import { connectDB } from '../src/db/database.js';

// Declaramos los clientes de prueba
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

// Declaramos los hooks, son funciones que se ejecutan antes y después de los tests
// Este hook es utilizado para conectarse a la base de datos antes de los tests
before(async function (done) {
  await connectDB();
  done();
});

// Declaramos los hooks, son funciones que se ejecutan antes y después de los tests
beforeEach(async (done) => {
  await Customer.deleteMany();
  done();
  await new Customer(firstCustomer).save();
  done();
  await new Customer(secondCustomer).save();
  done();
  await new Customer(thirdCustomer).save();
  done();
});

// Este hook es utilizado para borrar todos los clientes de la base de datos antes de cada test
afterEach(async (done) => {
  await Customer.deleteMany();
  done();
});

// Tests
// Pruebas para la API de clientes.
// funcion get que obtiene todos los clientes
describe('GET /customers', () => {
  // Prueba para obtener todos los clientes, debería devolver un array con 3 clientes
  it('Should return all customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(3);
  });

  // Prueba para obtener un cliente con un NIF específico, debería devolver un cliente con el NIF 11111111A
  it('Should return a customer with a specific nif', async () => {
    const res = await request(app).get(`/customers/${firstCustomer.nif}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('nif', firstCustomer.nif);
  });

  // Prueba para obtener un cliente con un NIF que no existe, debería devolver un error 404
  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).get('/customers/12345678A');
    expect(res.status).to.equal(404);
  });
});

// Pruebas para la API de clientes.
// funcion post que guarda un cliente en la base de datos
describe('POST /customers', () => {
  // Prueba para guardar un cliente en la base de datos, debería devolver un cliente con el NIF 11111111D
  it('Should save a customer in the database', async () => {
    const customer = {
      name: "Mary",
      surname: "Poppins",
      nif: "11111111D",
      genre: 'female'
    };
    // se envía una petición POST a la ruta /customers con el cliente a guardar
    const res = await request(app).post('/customers').send(customer);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('nif', customer.nif);
  });

  // prueba para guardar un cliente que ya existe en la base de datos, debería devolver un error 500
  it('Should return a 500 error if the customer already exists', async () => {
    // se envía una petición POST a la ruta /customers con el cliente que ya existe
    const res = await request(app).post('/customers').send(firstCustomer);
    expect(res.status).to.equal(500);
  });
});

// Pruebas para la API de clientes.
// funcion patch que actualiza un cliente en la base de datos
describe('PATCH /customers', () => {
  // Prueba para actualizar un cliente en la base de datos, debería devolver un cliente
  it('Should update a customer in the database', async () => {
    const res = await request(app).patch(`/customers/${firstCustomer.nif}`).send({ genre: 'female' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('genre', 'female');
  });

  // Prueba para actualizar un cliente que no existe en la base de datos, debería devolver un error 404
  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).patch('/customers/12345678A').send({ genre: 'female' });
    expect(res.status).to.equal(404);
  });

  // prueba para actualizar parcialmente un cliente en la base de datos
  // se actualiza el apellido de un cliente, debería devolver un cliente con el apellido actualizado
  it('Should partially update a customer in the database', async () => {
    const res = await request(app)
      // se envía una petición PATCH a la ruta /customers con el apellido a actualizar
      .patch(`/customers/${firstCustomer.nif}`)
      .send({ surname: 'Updated' });
  
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('surname', 'Updated');
    expect(res.body).to.have.property('name', firstCustomer.name);
  });
});

// Pruebas para la API de clientes.
// funcion delete que borra un cliente de la base de datos
describe('DELETE /customers', () => {
  // Prueba para borrar un cliente de la base de datos, debería devolver un 200
  it('Should delete a customer from the database', async () => {
    // se envía una petición DELETE a la ruta /customers con el NIF del cliente a borrar
    const res = await request(app).delete(`/customers/${firstCustomer.nif}`);
    expect(res.status).to.equal(200);
    const deletedCustomer = await Customer.findOne({ nif: firstCustomer.nif });
    expect(deletedCustomer).to.be.null;
  });

  // Prueba para borrar un cliente que no existe en la base de datos, debería devolver un error 404
  it('Should return a 404 error if the customer does not exist', async () => {
    const res = await request(app).delete('/customers/12345678A');
    expect(res.status).to.equal(404);
  });
});

// Pruebas para el esquema de clientes.
// se utiliza para validar los datos de los clientes
describe('Customer Schema', () => {
  // prueba para validar que el nombre de un cliente no esté vacío
  it('Should return an error if the NIF of a customer is empty', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '' });
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });

  // prueba para validar que el NIF de un cliente tenga 9 caracteres
  it('Should return an error if the NIF of a customer does not have 9 characters', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '12345678' });
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });

  // prueba para validar que el NIF de un cliente tenga un formato válido
  it('Should return an error if the NIF of a customer does not have a valid format', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '12345678a' }); 
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });
  
  // prueba para validar que el género de un cliente sea válido
  // debera ser masculino o femenino
  it('Should return an error if the genre of a customer is not valid', async () => {
    try {
      await Customer.create({ name: "Test", surname: "Test", nif: '123456789', genre: 'invalid' });
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
    }
  });
});