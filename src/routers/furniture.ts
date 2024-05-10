import express from 'express';
import { Furniture } from '../models/furnitures.js';

export const furnitureRouter = express.Router()


// __________________________________________________________________POST__________________________________________________________________

/**
 * Ruta POST para '/furnitures'. Crea un nuevo mueble en la base de datos.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del mueble a crear.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble creado con un estado 201 en caso de éxito, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.post('/furnitures', async (req, res) => {
  const furniture = new Furniture(req.body);
  // lo que hace es crear un nuevo objeto de la clase Furniture con los datos que vienen en el cuerpo de la solicitud
  try {
    await furniture.save();
    return res.status(201).send(furniture);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________

/**
 * Ruta GET para '/furnitures'. Obtiene uno o más muebles de la base de datos.
 * @param {Request} req - La solicitud HTTP. La consulta puede contener un nombre, material, altura, anchura, profundidad, garantía, color o precio para filtrar los muebles.
 * @param {Response} res - La respuesta HTTP. Devuelve los muebles encontrados en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con los filtros proporcionados, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.get('/furnitures', async (req, res) => {
  // constante que almacena los valores de la consulta
  const { name, material, height, width, depth, warranty, color, prize } = req.query
  // si no se proporciona ningún filtro, se devuelven todos los muebles
  let filter = {}

  if (name) filter = {...filter, ...{ name: name }};
  if (material) filter = {...filter, ...{ material: material }};
  if (height) filter = {...filter, ...{ height: height }};
  if (width) filter = {...filter, ...{ width: width }};
  if (depth) filter = {...filter, ...{ depth: depth }};
  if (warranty) filter = {...filter, ...{ warranty: warranty }};
  if (color) filter = {...filter, ...{ color: color }};
  if (prize) filter = {...filter, ...{ prize: prize }};

  try {
    const furnitures = await Furniture.find(filter);
    // si no se encontró ningún mueble con los filtros proporcionados
    if (furnitures.length !== 0) {
      return res.send(furnitures);
    }
    return res.status(404).send({ Error: "Furniture not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

/**
 * Ruta GET para '/furnitures/:id'. Obtiene un mueble específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del mueble a obtener.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble encontrado en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.get('/furnitures/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const furniture = await Furniture.findById(id);
    // si no se encontró ningún mueble con el ID proporcionado retorna un error
    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________

/**
 * Ruta PATCH para '/furnitures'. Actualiza un mueble específico en la base de datos utilizando su código de producto.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los datos del mueble a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble actualizado en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con el código de producto proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.patch('/furnitures', async (req, res) => {

  // constante que almacena los valores de la consulta
  const { name, material, height, width, depth, warranty, color, prize } = req.query
  // si no se proporciona ningún filtro, se devuelven todos los muebles
  let filter = {}

  if (name) filter = {...filter, ...{ name: name }};
  if (material) filter = {...filter, ...{ material: material }};
  if (height) filter = {...filter, ...{ height: height }};
  if (width) filter = {...filter, ...{ width: width }};
  if (depth) filter = {...filter, ...{ depth: depth }};
  if (warranty) filter = {...filter, ...{ warranty: warranty }};
  if (color) filter = {...filter, ...{ color: color }};
  if (prize) filter = {...filter, ...{ prize: prize }};

  // Constantes para validar los campos que se pueden actualizar
  const allowedUpdates = ["name", "material", "width", "height", "depth", "color", "prize", "warranty"];
  const requestedUpdates = Object.keys(req.body);
  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la solicitud no es válida, se devuelve un error
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const furniture = await Furniture.updateMany(filter, req.body )
    // si se encontró el mueble y se actualizó correctamente, se devuelve el mueble actualizado
    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

/**
 * Ruta PATCH para '/furnitures/:id'. Actualiza un mueble específico en la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. El cuerpo de la solicitud debe contener los campos a actualizar.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble actualizado en caso de éxito, un error con un estado 400 si la actualización solicitada no es válida, un error con un estado 404 si no se encontró ningún mueble con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.patch('/furnitures/:id', async (req, res) => {
  // cosntantes para validar los campos que se pueden actualizar
  const allowedUpdates = ["name", "material", "width", "height", "depth", "color", "prize", "warranty"];
  const requestedUpdates = Object.keys(req.body);
  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));
  // si la solicitud no es válida, se devuelve un error
  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  try {
    const furniture = await Furniture.findByIdAndUpdate(req.params.id, req.body )
    // si se encontró el mueble y se actualizó correctamente, se devuelve el mueble actualizado
    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________

/**
 * Ruta DELETE para '/furnitures'. Elimina un mueble específico de la base de datos utilizando su código de producto.
 * @param {Request} req - La solicitud HTTP. La consulta debe contener el código de producto del mueble a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con el código de producto proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.delete('/furnitures', async (req, res) => {

  // constante que almacena los valores de la consulta
  const { name, material, height, width, depth, warranty, color, prize } = req.query
  // si no se proporciona ningún filtro, se devuelven todos los muebles
  let filter = {}

  if (name) filter = {...filter, ...{ name: name }};
  if (material) filter = {...filter, ...{ material: material }};
  if (height) filter = {...filter, ...{ height: height }};
  if (width) filter = {...filter, ...{ width: width }};
  if (depth) filter = {...filter, ...{ depth: depth }};
  if (warranty) filter = {...filter, ...{ warranty: warranty }};
  if (color) filter = {...filter, ...{ color: color }};
  if (prize) filter = {...filter, ...{ prize: prize }};

  try {
    const furniture = await Furniture.deleteMany(filter);
    // si se encontró el mueble y se eliminó correctamente, se devuelve el mueble eliminado
    if (furniture) {
      return res.status(200).send(furniture);
    }
    return res.status(404).send({ Error: "Furniture not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})

/**
 * Ruta DELETE para '/furnitures/:id'. Elimina un mueble específico de la base de datos utilizando su ID.
 * @param {Request} req - La solicitud HTTP. Los parámetros deben contener el ID del mueble a eliminar.
 * @param {Response} res - La respuesta HTTP. Devuelve el mueble eliminado en caso de éxito, un error con un estado 404 si no se encontró ningún mueble con el ID proporcionado, o un error con un estado 500 en caso de fallo.
 * @returns {Promise<Response>} Una promesa que resuelve a una respuesta HTTP.
 */
furnitureRouter.delete('/furnitures/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findByIdAndDelete(req.params.id);
    // si se encontró el mueble y se eliminó correctamente, se devuelve el mueble eliminado
    if (furniture) {
      return res.status(200).send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});