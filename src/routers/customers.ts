import express from 'express';
import { Customer } from '../models/customers.js';

export const customerRouter = express.Router()

// __________________________________________________________________POST__________________________________________________________________

/**
 * Ruta POST para '/customers'. Crea un nuevo cliente en la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del cliente a crear.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    return res.status(201).send(customer);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________

/**
 * Ruta GET para '/customers'. Obtiene uno o más clientes de la base de datos.
 * @param {Request} req - La solicitud HTTP. La consulta puede contener un NIF para filtrar los clientes.
 * @param {Response} res - La respuesta HTTP. Devuelve los clientes encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún cliente con el NIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.get('/customers', async (req, res) => {
  const filter = req.query.nif? {nif: req.query.nif.toString()} : {};
  try {
    const customers = await Customer.find(filter);
    // si no se encontró ningún cliente con el NIF proporcionado
    if (customers.length !== 0) {
      return res.send(customers);
    }
    return res.status(404).send({ Error: "Customer NIF not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

/**
 * Ruta GET para '/customers/:id'. Obtiene un cliente específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del cliente a obtener.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún cliente con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.get('/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (customer) {
      return res.send(customer);
    }
    return res.status(404).send({ Error: "Customer ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________

/**
 * Ruta PATCH para '/customers'. Actualiza un cliente específico en la base de datos utilizando su NIF.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el NIF del cliente a actualizar y el cuerpo de la solicitud debe contener los campos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente actualizado en caso de éxito, un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encontró ningún cliente con el NIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.patch('/customers', async (req, res) => {
  // constantes para validar las actualizaciones permitidas
  const allowedUpdates = ["surname", "name", "genre"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la actualización solicitada no es válida
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  } 
  try {
    // Busca y actualiza el cliente según el NIF proporcionado en la consulta
    const customer = await Customer.findOneAndUpdate({
      nif: req.query.nif
    }, req.body )
    // Devuelve el cliente actualizado
    if (customer) {
      return res.send(customer);
    }
    // Si no se encuentra el cliente, devuelve un error
    return res.status(404).send({ Error: "Customer NIF not found" }); 
  // Si hay un error interno del servidor, devuelve el error
  } catch (error) {
    return res.status(500).send(error);
  } 
});

/**
 * Ruta PATCH para '/customers/:id'. Actualiza un cliente específico en la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del cliente a actualizar y el cuerpo de la solicitud debe contener los campos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente actualizado en caso de éxito, un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encontró ningún cliente con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.patch('/customers/:id', async (req, res) => {
  // constantes para validar las actualizaciones permitidas
  const allowedUpdates = ["surname", "name", "genre"];
  const requestedUpdates = Object.keys(req.body);
  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la actualización solicitada no es válida
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body )
    // si se encuentra el cliente, devuelve el cliente actualizado
    if (customer) {
      return res.send(customer);
    }
    // si no se encuentra el cliente, devuelve un error
    return res.status(404).send({ Error: "Customer ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________

/**
 * Ruta DELETE para '/customers'. Elimina un cliente específico de la base de datos utilizando su NIF.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el NIF del cliente a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún cliente con el NIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.delete('/customers', async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      nif: req.query.nif
    });
    // si se encuentra el cliente, devuelve el cliente eliminado
    if (customer) {
      return res.status(200).send(customer);
    }
    return res.status(404).send({ Error: "Customer NIF not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})

/**
 * Ruta DELETE para '/customers/:id'. Elimina un cliente específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del cliente a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el cliente eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún cliente con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
customerRouter.delete('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (customer) {
      return res.status(200).send(customer);
    }
    return res.status(404).send({ Error: "Customer ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});