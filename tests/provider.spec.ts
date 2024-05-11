import "mocha";
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/index.js';
import { Provider } from '../src/models/providers.js';

/**
 * Pruebas de integración para la API de proveedores
 */
describe('Provider API', () => {
  // Antes de todas las pruebas, nos conectamos a la base de datos
  before(async () => {
    const url = 'mongodb://127.0.0.1/provider_test';
    await mongoose.connect(url);
  });

  // Después de todas las pruebas, eliminamos la base de datos y cerramos la conexión
  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Antes de cada prueba, eliminamos todos los proveedores
  afterEach(async () => {
    await Provider.deleteMany();
  });

  // Pruebas
  it('should create a new provider', async () => {
    // Creamos un proveedor de ejemplo
    const newProvider = {
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    };
    
    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(201);

    // Comprobamos que el proveedor se ha creado correctamente
    expect(response.body).to.have.property('_id');
    // Comprobamos que los datos del proveedor son correctos
    expect(response.body.name).to.equal(newProvider.name);
    expect(response.body.address).to.equal(newProvider.address);
    expect(response.body.phone).to.equal(newProvider.phone);
    expect(response.body.category).to.equal(newProvider.category);
  });

  // Prueba para comprobar que se obtienen todos los proveedores
  it('should get a list of providers', async () => {
    // Creamos dos proveedores de ejemplo
    const providers = [
      { cif: 'A1234567B', name: 'Proveedor 1', address: 'Calle 1', phone: 912345678, category: 'wood' },
      { cif: 'A1234567C', name: 'Proveedor 2', address: 'Calle 2', phone: 912345679, category: 'office' }
    ];

    // Insertamos los proveedores en la base de datos
    await Provider.insertMany(providers);

    // Enviamos la petición GET para obtener todos los proveedores
    const response = await request(app)
      .get('/providers')
      .expect(200);

    // Comprobamos que se han obtenido los dos proveedores
    expect(response.body.length).to.equal(2);
    // Comprobamos que los datos de los proveedores son correctos
    expect(response.body[0].name).to.equal(providers[0].name);
    expect(response.body[1].name).to.equal(providers[1].name);
    expect(response.body[0].address).to.equal(providers[0].address);
    expect(response.body[1].address).to.equal(providers[1].address);
    expect(response.body[0].phone).to.equal(providers[0].phone);
    expect(response.body[1].phone).to.equal(providers[1].phone);
    expect(response.body[0].category).to.equal(providers[0].category);
    expect(response.body[1].category).to.equal(providers[1].category);
  });

  // Prueba para comprobar que se obtiene un proveedor por su id
  it('should get a provider by id', async () => {
    // Creamos un proveedor de ejemplo
    const provider = new Provider({
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    });

    // Guardamos el proveedor en la base de datos
    await provider.save();

    // Enviamos la petición GET para obtener el proveedor por su id
    const response = await request(app)
      .get(`/providers/${provider._id}`)
      .expect(200);

    // Comprobamos que los datos del proveedor son correctos
    expect(response.body.name).to.equal(provider.name);
    expect(response.body.address).to.equal(provider.address);
    expect(response.body.phone).to.equal(provider.phone);
    expect(response.body.category).to.equal(provider.category);
  });

  // Prueba para comprobar que se actualiza un proveedor
  it('should update a provider', async () => {
    // Creamos un proveedor de ejemplo
    const provider = new Provider({
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    });

    // Guardamos el proveedor en la base de datos
    await provider.save();

    // Datos a actualizar
    const updates = { name: 'Proveedor Actualizado', category: 'office' };

    // Enviamos la petición PUT para actualizar el proveedor
    const response = await request(app)
      .put(`/providers/${provider._id}`)
      .send(updates)
      .expect(200);

    // Comprobamos que los datos del proveedor se han actualizado correctamente
    expect(response.body.name).to.equal(updates.name);
    expect(response.body.category).to.equal(updates.category);
    expect(response.body.address).to.equal(provider.address);
    expect(response.body.phone).to.equal(provider.phone);
  });

  // Prueba para comprobar que se elimina un proveedor
  it('should delete a provider', async () => {
    // Creamos un proveedor de ejemplo
    const provider = new Provider({
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    });

    // Guardamos el proveedor en la base de datos
    await provider.save();

    // Enviamos la petición DELETE para eliminar el proveedor
    await request(app)
      .delete(`/providers/${provider._id}`)
      .expect(204);

    // Comprobamos que el proveedor se ha eliminado correctamente
    const foundProvider = await Provider.findById(provider._id);
    expect(foundProvider).to.be.null;
  });

  // Pruebas para errores
  it('should return 400 if required fields are missing', async () => {
    // Creamos un proveedor con datos incompletos
    const newProvider = {
      address: 'Calle Falsa 123',
      phone: 912345678
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(400);

    // Comprobamos que se ha devuelto un error
    expect(response.body.message).to.not.be.null;
  });

  // Prueba para comprobar que se devuelve un error si el CIF ya existe
  it('should return 400 for invalid CIF format', async () => {
    // Creamos un proveedor con un CIF inválido
    const newProvider = {
      cif: 'INVALIDCIF',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'wood'
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(400);

    // Comprobamos que se ha devuelto un error
    expect(response.body.message).to.equal('El Código de Identificación Fiscal no es válido');
  });

  // Prueba para comprobar que se devuelve un error si el CIF ya existe
  it('should return 400 for invalid phone number', async () => {
    // Creamos un proveedor con un número de teléfono inválido
    const newProvider = {
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 123,
      category: 'wood'
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(400);

    // Comprobamos que se ha devuelto un error
    expect(response.body.message).to.equal('Número de teléfono válido');
  });

  // Prueba para comprobar que se devuelve un error si no se proporciona una categoría
  it('should set default category to "other" if not provided', async () => {
    // Creamos un proveedor sin categoría
    const newProvider = {
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(201);

    // Comprobamos que la categoría por defecto es "other"
    expect(response.body.category).to.equal('other');
  });

  // Prueba para comprobar que se devuelve un error si la categoría no es válida
  it('should return 400 for invalid category value', async () => {
    // Creamos un proveedor con una categoría inválida
    const newProvider = {
      cif: 'A1234567B',
      name: 'Proveedor Ejemplo',
      address: 'Calle Falsa 123',
      phone: 912345678,
      category: 'invalidcategory'
    };

    // Enviamos la petición POST para crear un nuevo proveedor
    const response = await request(app)
      .post('/providers')
      .send(newProvider)
      .expect(400);

    // Comprobamos que se ha devuelto un error
    expect(response.body.message).to.equal('`invalidcategory` is not a valid enum value for path `category`.');
  });
});