import express from 'express';
import { Furniture } from '../models/furnitures.js';

export const furnitureRouter = express.Router()


// __________________________________________________________________POST__________________________________________________________________

furnitureRouter.post('/furnitures', async (req, res) => {
  const furniture = new Furniture(req.body);
  
  try {
    await furniture.save();
    return res.status(201).send(furniture);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________


furnitureRouter.get('/furnitures', async (req, res) => {

  const { name, material, height, width, depth, warranty, color, prize } = req.query

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

    if (furnitures.length !== 0) {
      return res.send(furnitures);
    }
    return res.status(404).send({ Error: "Furniture not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})


furnitureRouter.get('/furnitures/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const furniture = await Furniture.findById(id);
    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________


furnitureRouter.patch('/furnitures', async (req, res) => {
  
  const allowedUpdates = ["name", "material", "width", "height", "depth", "color", "prize", "warranty"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));

  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  
  try {
    const furniture = await Furniture.findOneAndUpdate({productCode: req.query.productCode?.toString()}, req.body )

    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

furnitureRouter.patch('/furnitures/:id', async (req, res) => {
  
  const allowedUpdates = ["name", "material", "width", "height", "depth", "color", "prize", "warranty"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));

  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  
  try {
    const furniture = await Furniture.findByIdAndUpdate(req.params.id, req.body )

    if (furniture) {
      return res.send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________


furnitureRouter.delete('/furnitures', async (req, res) => {
  try {
    const furniture = await Furniture.findOneAndDelete({productCode: req.query.productCode?.toString()});

    if (furniture) {
      return res.status(200).send(furniture);
    }
    return res.status(404).send({ Error: "Furniture not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})


furnitureRouter.delete('/furnitures/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findByIdAndDelete(req.params.id);

    if (furniture) {
      return res.status(200).send(furniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});