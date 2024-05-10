import express from 'express'
import { Transaction } from "../models/transactions.js";
import { Furniture } from '../models/furnitures.js';
import { Provider } from '../models/providers.js';
import { Customer } from '../models/customers.js';

export const transactionRouter = express.Router()

// __________________________________________________________________POST__________________________________________________________________

/**
 * Ruta POST para '/transactions
 *'. Crea una nueva transacción en la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del transacción a crear.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.post('/transactions', async (req, res) => {
  try {
    const { 
      providerCIF, 
      customerNIF, 
      type,
      // También si no está creado deberemos introducir los datos para crear el mueble
      name,
      productCode, 
      material,
      height,
      width,
      depth,
      warranty,
      color,
     } = req.body;

    let furniture = await Furniture.findOne({ productCode: productCode });
    if (!furniture) {
      // si no ha encontrado ningún mueble con el productCode, crea uno nuevo con los datos introducidos
      furniture = new Furniture({
        name: name,
        productCode: productCode,
        material: material,
        height: height,
        width: width,
        depth: depth,
        warranty: warranty,
        color: color,
        prize: req.query.moneyAmount
      })
      await furniture.save()
    }

    let entityID;

    if (providerCIF) {
      const provider = await Provider.findOne({ cif: providerCIF });
      if (!provider) {
        return res.status(400).send({ Error: "Provider not found" });
      }
      entityID = provider._id;
    } else if (customerNIF) {
      const customer = await Customer.findOne({ nif: customerNIF });
      if (!customer) {
        return res.status(400).send({ Error: "Customer not found" });
      }
      entityID = customer._id;
    } else {
      return res.status(400).send({ Error: "Must insert a customer nif or a provider cif" });
    }

    const transaction = new Transaction({
      ...req.body,
      furnitureID: furniture._id,
      providerID: type.toString() === 'purchase' ? entityID : undefined,
      customerID: type.toString() === 'sell' ? entityID : undefined
    });

    await transaction.save();

    await transaction.populate({
      path: 'furnitureID',
      select: ['name', 'material', 'height', 'width', 'depth', 'warranty', 'color']
    });

    if (type === 'purchase') {
      await transaction.populate({
        path: 'providerID',
        select: ['cif', 'name', 'address', 'phone', 'category']
      });
    } else {
      await transaction.populate({
        path: 'customerID',
        select: ['surname', 'name', 'nif', 'genre']
      });
    }

    return res.status(201).send(transaction);
  } catch (error) {
    return res.status(500).send(error);
  }

});


// ___________________________________________________________________GET__________________________________________________________________

/**
 * Ruta GET para '/transactions
 *'. Obtiene una o más transacciones de la base de datos.
 * @param {Request} req - La solicitud HTTP. La consulta puede contener un CIF para filtrar los transacciones.
 * @param {Response} res - La respuesta HTTP. Devuelve los transacciones encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.get('/transactions', async (req, res) => {
  const { type, productCode, customerNIF, providerCIF, moneyAmount } = req.query
  let filter = {}

  if (type) filter = {...filter, ...{ type: type }};
  if (productCode) filter = {...filter, ...{ productCode: productCode }};
  if (customerNIF) filter = {...filter, ...{ customerNIF: customerNIF }};
  if (providerCIF) filter = {...filter, ...{ providerCIF: providerCIF }};
  if (moneyAmount) filter = {...filter, ...{ moneyAmount: moneyAmount }};

  try {
    const transactions = await Transaction.find(filter);
    // si no se encontró ningún transacción con el CIF proporcionado
    if (transactions.length !== 0) {
      return res.send(transactions);
    }
    return res.status(404).send({ Error: "Transaction cif not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

/**
 * Ruta GET para '/transactions
 *:id'. Obtiene un transacción específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del transacción a buscar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.get('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    // si no se encontró ninguna transacción con el ID proporcionado
    if (transaction) {
      return res.send(transaction);
    }
    return res.status(404).send({ Error: "Transaction ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________


/**
 * Ruta PATCH para '/transactions
 *'. Actualiza una o más transacciones de la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción actualizada en caso de éxito, un error con un estado 404 si no se encontró ninguna transacción con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.patch('/transactions', async (req, res) => {
  const { type, productCode, customerNIF, providerCIF, moneyAmount } = req.query
  let filter = {}

  if (type) filter = {...filter, ...{ type: type }};
  if (productCode) filter = {...filter, ...{ productCode: productCode }};
  if (customerNIF) filter = {...filter, ...{ customerNIF: customerNIF }};
  if (providerCIF) filter = {...filter, ...{ providerCIF: providerCIF }};
  if (moneyAmount) filter = {...filter, ...{ moneyAmount: moneyAmount }};

  const allowedUpdates = ["type", "productCode", "providerCIF", "customerNIF", "moneyAmount"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const transaction = await Transaction.updateMany(filter, req.body )
    if (transaction) {
      return res.send(transaction);
    }
    return res.status(404).send({ Error: "Transaction not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

/**
 * Ruta PATCH para '/transactions
 *:id'. Actualiza un transacción específico en la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del transacción a actualizar. El cuerpo de la solicitud debe contener los datos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción actualizada en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.patch('/transactions/:id', async (req, res) => {
  const allowedUpdates = ["type", "productCode", "providerCIF", "customerNIF", "moneyAmount"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body )
    if (transaction) {
      return res.send(transaction);
    }
    return res.status(404).send({ Error: "Transaction ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________

/**
 * Ruta DELETE para '/transactions
 *'. Elimina un transacción de la base de datos utilizando su CIF.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el CIF del transacción a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.delete('/transactions', async (req, res) => {

  const { type, productCode, customerNIF, providerCIF, moneyAmount } = req.query
  let filter = {}

  if (type) filter = {...filter, ...{ type: type }};
  if (productCode) filter = {...filter, ...{ productCode: productCode }};
  if (customerNIF) filter = {...filter, ...{ customerNIF: customerNIF }};
  if (providerCIF) filter = {...filter, ...{ providerCIF: providerCIF }};
  if (moneyAmount) filter = {...filter, ...{ moneyAmount: moneyAmount }};

  try {
    const transaction = await Transaction.deleteMany(filter);
    if (transaction) {
      return res.status(200).send(transaction);
    }
    return res.status(404).send({ Error: "Transaction cif not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})

/**
 * Ruta DELETE para '/transactions
 *:id'. Elimina un transacción específica de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del transacción a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el transacción eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún transacción con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
transactionRouter.delete('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (transaction) {
      return res.status(200).send(transaction);
    }
    return res.status(404).send({ Error: "Transaction ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});