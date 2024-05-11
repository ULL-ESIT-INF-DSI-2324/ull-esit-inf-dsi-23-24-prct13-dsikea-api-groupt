import "mocha";
import { expect } from "chai";
import request from "supertest";
import { app } from "../src/index.js";
import { Furniture } from "../src/models/furnitures.js";
import { connectDB } from '../src/db/database.js';

// declaramos muebles de prueba con sus respectivos datos
const firstFurniture = {
  name: "Mesa",
  price: 100,
  stock: 10,
  category: 'wood'
};

const secondFurniture = {
  name: "Silla",
  price: 50,
  stock: 20,
  category: 'office'
};

const thirdFurniture = {
  name: "Armario",
  price: 200,
  stock: 5,
  category: 'wood'
};

// declaramos los hooks, son funciones que se ejecutan antes y después de los tests
// este es utilizado para conectarse a la base de datos antes de los tests
before(async function (done) {
  await connectDB();
  done();
});

// este se utiliza para insertar los muebles de prueba en la base de datos antes de cada test
beforeEach(async () => {
  await Furniture.deleteMany();
  await new Furniture(firstFurniture).save();
  await new Furniture(secondFurniture).save();
  await new Furniture(thirdFurniture).save();
});

// este es utilizado para borrar todos los muebles de la base de datos después de cada test
afterEach(async () => {
  await Furniture.deleteMany();
});

// Tests de integración para la API de muebles
describe('Furniture API', () => {
  // prueba que crea un nuevo mueble en la base de datos
  it('should create a new furniture', async () => {
    const newFurniture = {
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'wood'
    };
    // enviamos la petición POST para crear un nuevo mueble
    const response = await request(app)
      .post('/furnitures')
      .send(newFurniture)
      .expect(201);
    // comprobamos que el nombre del mueble creado sea el mismo que el enviado
    expect(response.body.name).to.equal(newFurniture.name);
  });

  // prueba que falla al crear un mueble sin nombre
  it('should fail to create a furniture without a name', async () => {
    const newFurniture = {
      price: 150,
      stock: 5,
      category: 'wood'
    };
    const response = await request(app)
      .post('/furnitures')
      .send(newFurniture)
      .expect(400);
    expect(response.body.error).to.equal('Name is required');
  });

  // prueba que falla al crear un mueble con una categoría inválida
  it('should fail to create a furniture with invalid category', async () => {
    const newFurniture = {
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'invalid_category' // categoría inválida
    };
    const response = await request(app)
      .post('/furnitures')
      .send(newFurniture)
      .expect(400);
    expect(response.body.error).to.equal('Invalid category');
  });

  // prueba que falla al crear un mueble con stock negativo
  it('should fail to create a furniture with negative stock', async () => {
    const newFurniture = {
      name: 'Mesa de centro',
      price: 150,
      stock: -5, // stock negativo
      category: 'wood'
    };
    const response = await request(app)
      .post('/furnitures')
      .send(newFurniture)
      .expect(400);
    expect(response.body.error).to.equal('Stock cannot be negative');
  });

  // prueba que actualiza un mueble en la base de datos por su id
  it('should update a furniture by id', async () => {
    const furniture = new Furniture({
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'wood'
    });
    await furniture.save();
    const updatedFurniture = {
      name: 'Mesa de centro grande',
      price: 200,
      stock: 10,
      category: 'wood'
    };
    const response = await request(app)
      .put(`/furnitures/${furniture._id}`)
      .send(updatedFurniture)
      .expect(200);
    // comporbamos que los datos del mueble actualizado sean los mismos que los enviados
    expect(response.body.name).to.equal(updatedFurniture.name);
    expect(response.body.price).to.equal(updatedFurniture.price);
    expect(response.body.stock).to.equal(updatedFurniture.stock);
  });

  // prueba que falla al actualizar un mueble con un id inexistente
  it('should fail to update a furniture with non-existent id', async () => {
    const updatedFurniture = {
      name: 'Mesa de centro grande',
      price: 200,
      stock: 10,
      category: 'wood'
    };
    const response = await request(app)
      .put(`/furnitures/1234567890abcdef12345678`) // id inexistente
      .send(updatedFurniture)
      .expect(404);
    expect(response.body.error).to.equal('Furniture not found');
  });

  // prueba que obtiene todos los muebles de la base de datos
  it('should get all furnitures', async () => {
    const response = await request(app)
      .get('/furnitures')
      .expect(200);
    // comprobamos que la respuesta tenga 3 muebles
    expect(response.body).to.have.lengthOf(3);
  });

  // prueba que falla al obtener un mueble con un id inexistente
  it('should fail to get a furniture with non-existent id', async () => {
    const response = await request(app)
      .get(`/furnitures/1234567890abcdef12345678`) // id inexistente
      .expect(404);
    expect(response.body.error).to.equal('Furniture not found');
  });

  // prueba para asegurarnos que no devuelve algo inexistente
  it('should get a furniture by id', async () => {
    const furniture = new Furniture({
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'wood'
    });
    await furniture.save();
    const response = await request(app)
      .get(`/furnitures/${furniture._id}`)
      .expect(200);
    // comprobamos que el nombre del mueble obtenido sea el mismo que el creado
    expect(response.body.name).to.equal(furniture.name);
  });

  // prueba que elimina un mueble de la base de datos por su id
  it('should delete a furniture by id', async () => {
    const furniture = new Furniture({
      name: 'Mesa de centro',
      price: 150,
      stock: 5,
      category: 'wood'
    });
    await furniture.save();
    const response = await request(app)
      .delete(`/furnitures/${furniture._id}`)
      .expect(200); 
    // comprobamos que el nombre del mueble eliminado sea el mismo que el creado
    expect(response.body.name).to.equal(furniture.name);
  });

  // prueba que falla al eliminar un mueble con un id inexistente
  it('should fail to delete a furniture with non-existent id', async () => {
    const response = await request(app)
      .delete(`/furnitures/1234567890abcdef12345678`) // id inexistente
      .expect(404);
    expect(response.body.error).to.equal('Furniture not found');
  });
});
