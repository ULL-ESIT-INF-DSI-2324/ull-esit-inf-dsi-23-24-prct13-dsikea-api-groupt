import { expect } from 'chai';
import "mocha";
import request from 'supertest';
import { app } from '../src/index.js';
import mongoose from 'mongoose';
import { Transaction } from '../src/models/transactions.js';
import { Furniture } from '../src/models/furnitures.js';
import { Provider } from '../src/models/providers.js';
import { Customer } from '../src/models/customers.js';

/**
 * Pruebas para el API de transacciones.
 */
describe('Transactions API', () => {
  // Antes de todas las pruebas, nos conectamos a la base de datos.
  before(async () => {
    const url = 'mongodb://127.0.0.1/transactions_test';
    await mongoose.connect(url);
  });

  // Después de todas las pruebas, eliminamos la base de datos y cerramos la conexión.
  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Antes de cada prueba, eliminamos todos los documentos de las colecciones.
  afterEach(async () => {
    await Transaction.deleteMany();
    await Furniture.deleteMany();
    await Provider.deleteMany();
    await Customer.deleteMany();
  });

  // Prueba para crear una nueva transacción.
  it('should create a new transaction', async () => {
    // Creamos un mueble, un proveedor y un
    // cliente para poder crear una transacción.
    const furniture = await new Furniture({
      name: 'Chair',
      productCode: 'C123',
      material: 'wood',
      height: 100,
      width: 50,
      warranty: 2,
      prize: 150
    }).save();

    const provider = await new Provider({
      cif: 'A1234567B',
      name: 'Provider One',
      address: 'Some Street 123',
      phone: 912345678
    }).save();

    const customer = await new Customer({
      surname: 'Smith',
      name: 'John',
      nif: '12345678A'
    }).save();

    // Creamos una nueva transacción de venta.
    const newTransaction = {
      type: 'sell',
      productCode: 'C123',
      providerCIF: provider.cif,
      customerNIF: customer.nif,
      moneyAmount: 200,
      furnitureID: furniture._id
    };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .expect(201);

    // Verificamos que la transacción se haya creado correctamente.
    expect(response.body).to.have.property('_id');
    expect(response.body.type).to.equal(newTransaction.type);
  });

  it('should get all transactions', async () => {
    // Creamos una transacción de compra.
    const transaction = await new Transaction({
      type: 'purchase',
      moneyAmount: 500,
      furnitureID: new mongoose.Types.ObjectId() // Asume que esto es válido
    }).save();

    // Enviamos la petición al servidor.
    const response = await request(app)
      .get('/transactions')
      .expect(200);

    // Verificamos que la transacción se haya creado correctamente.
    expect(response.body.length).to.equal(1);
    // Verificamos que los datos de la transacción sean correctos.
    expect(response.body[0].moneyAmount).to.equal(transaction.moneyAmount);
    expect(response.body[0].type).to.equal(transaction.type);
    expect(response.body[0].furnitureID).to.equal(transaction.furnitureID.toString());
  });

  // Prueba para obtener una transacción por su id.
  it('should get a transaction by id', async () => {
    // Creamos una transacción de venta.
    const transaction = await new Transaction({
      type: 'sell',
      moneyAmount: 300,
      furnitureID: new mongoose.Types.ObjectId() // Asume que esto es válido
    }).save();

    // Enviamos la petición al servidor.
    const response = await request(app)
      .get(`/transactions/${transaction._id}`)
      .expect(200);

    // Verificamos que la transacción se haya creado correctamente y que los datos sean correctos.
    expect(response.body.moneyAmount).to.equal(transaction.moneyAmount);
    expect(response.body.type).to.equal(transaction.type);
    expect(response.body.furnitureID).to.equal(transaction.furnitureID.toString());
  });

  // Prueba para eliminar una transacción.
  it('should delete a transaction', async () => {
    // Creamos una transacción de compra.
    const transaction = await new Transaction({
      type: 'purchase',
      moneyAmount: 500,
      furnitureID: new mongoose.Types.ObjectId() // Asume que esto es válido
    }).save();

    // Enviamos la petición al servidor.
    await request(app)
      .delete(`/transactions/${transaction._id}`)
      .expect(204);

    // Verificamos que la transacción se haya eliminado correctamente.
    const deletedTransaction = await Transaction.findById(transaction._id);
    expect(deletedTransaction).to.be.null;
  });

  // Prueba para actualizar una transacción.
  it('should update a transaction', async () => {
    // Creamos una transacción de venta.
    const transaction = await new Transaction({
      type: 'sell',
      moneyAmount: 150,
      furnitureID: new mongoose.Types.ObjectId() // Asume que esto es válido
    }).save();

    // Actualizamos la cantidad de dinero de la transacción.
    const update = { moneyAmount: 250 };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .put(`/transactions/${transaction._id}`)
      .send(update)
      .expect(200);

    // Verificamos que la transacción se haya actualizado correctamente.
    expect(response.body.moneyAmount).to.equal(update.moneyAmount);
  });

  // Pruebas para comprobar los errores.

  // Prueba para comprobar que se devuelve un error 404 si no se encuentra la transacción.
  it('should return 400 if referenced furnitureID does not exist', async () => {
    // Creamos una transacción de venta.
    const newTransaction = {
      type: 'sell',
      productCode: 'C123',
      moneyAmount: 100,
      furnitureID: new mongoose.Types.ObjectId() // Esto no existe
    };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .expect(400);

    // Verificamos que se haya devuelto un error 404.
    expect(response.body.message).to.include('validation failed');
  });

  // Prueba para comprobar que se devuelve un error 400 si no se encuentra el proveedor.
  it('should return 400 if referenced providerID does not exist', async () => {
    // Creamos un mueble para poder crear una transacción.
    const furniture = await new Furniture({
      name: 'Chair',
      productCode: 'C123',
      material: 'wood',
      height: 100,
      width: 50,
      warranty: 2,
      prize: 150
    }).save();

    // Creamos una nueva transacción de venta.
    const newTransaction = {
      type: 'sell',
      productCode: 'C123',
      moneyAmount: 100,
      furnitureID: furniture._id,
      providerID: new mongoose.Types.ObjectId() // Asume que esto no existe
    };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .expect(400);

    // Verificamos que se haya devuelto un error 400.
    expect(response.body.message).to.include('validation failed');
  });

  // Prueba para comprobar que se devuelve un error 400 si no se encuentra el cliente.
  it('should return 400 if referenced customerID does not exist', async () => {
    // Creamos un mueble para poder crear una transacción.
    const furniture = await new Furniture({
      name: 'Chair',
      productCode: 'C123',
      material: 'wood',
      height: 100,
      width: 50,
      warranty: 2,
      prize: 150
    }).save();

    // Creamos una nueva transacción de venta.
    const newTransaction = {
      type: 'sell',
      productCode: 'C123',
      moneyAmount: 100,
      furnitureID: furniture._id,
      customerID: new mongoose.Types.ObjectId() // Asume que esto no existe
    };

    // Enviamos la petición al servidor.
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .expect(400);

    // Verificamos que se haya devuelto un error 400.
    expect(response.body.message).to.include('validation failed');
  });
});