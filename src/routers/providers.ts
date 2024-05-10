import express from 'express';
import { Provider } from '../models/providers.js';

export const providerRouter = express.Router()


// __________________________________________________________________POST__________________________________________________________________

/**
 * Ruta POST para '/providers'. Crea un nuevo proveedor en la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del proveedor a crear.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.post('/providers', async (req, res) => {
  const provider = new Provider(req.body);
  // Lo que hace es crear un nuevo objeto de la clase Provider con los datos que vienen en el cuerpo de la solicitud
  try {
    await provider.save();
    return res.status(201).send(provider);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________

/**
 * Ruta GET para '/providers'. Obtiene uno o más proveedores de la base de datos.
 * @param {Request} req - La solicitud HTTP. La consulta puede contener un CIF para filtrar los proveedores.
 * @param {Response} res - La respuesta HTTP. Devuelve los proveedores encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.get('/providers', async (req, res) => {
  const filter = req.query.cif? {cif: req.query.cif.toString()} : {};
  try {
    const providers = await Provider.find(filter);
    // si no se encontró ningún proveedor con el CIF proporcionado
    if (providers.length !== 0) {
      return res.send(providers);
    }
    return res.status(404).send({ Error: "Provider cif not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

/**
 * Ruta GET para '/providers/:id'. Obtiene un proveedor específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del proveedor a buscar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.get('/providers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const provider = await Provider.findById(id);
    // si no se encontró ningún proveedor con el ID proporcionado
    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________


/**
 * Ruta PATCH para '/providers'. Actualiza uno o más proveedores de la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor actualizado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.patch('/providers', async (req, res) => {
  // constantes  que almacenan los valores permitidos para actualizar
  const allowedUpdates = ["cif", "name", "address", "phone", "category"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la solicitud no es válida, se devuelve un error
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    // se busca un proveedor por su CIF y se actualizan los datos
    const provider = await Provider.findOneAndUpdate({
      cif: req.query.cif
    }, req.body )
    // si se encontró un proveedor con el CIF proporcionado
    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider cif not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

/**
 * Ruta PATCH para '/providers/:id'. Actualiza un proveedor específico en la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del proveedor a actualizar. El cuerpo de la solicitud debe contener los datos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor actualizado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.patch('/providers/:id', async (req, res) => {
  // constantes para validar los campos que se pueden actualizar
  const allowedUpdates = ["cif", "name", "address", "phone", "category"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la solicitud no es válida, se devuelve un error
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body )
    // si se encontró un proveedor con el ID proporcionado
    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________

/**
 * Ruta DELETE para '/providers'. Elimina un proveedor de la base de datos utilizando su CIF.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el CIF del proveedor a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el CIF proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.delete('/providers', async (req, res) => {
  try {
    const provider = await Provider.findOneAndDelete({
      cif: req.query.cif
    });
    // si se encontró un proveedor con el CIF proporcionado
    if (provider) {
      return res.status(200).send(provider);
    }
    return res.status(404).send({ Error: "Provider cif not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})

/**
 * Ruta DELETE para '/providers/:id'. Elimina un proveedor específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El parámetro de la ruta debe contener el ID del proveedor a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el proveedor eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún proveedor con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
providerRouter.delete('/providers/:id', async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    // si el proveedor con el ID proporcionado no se encontró
    if (provider) {
      return res.status(200).send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});