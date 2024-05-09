import express from 'express';
import { Furniture } from '../models/furnitures.js';

export const furnitureRouter = express.Router()


// __________________________________________________________________POST__________________________________________________________________

furnitureRouter.post('/furnitures', async (req, res) => {
  console.log(req.body);
  const forniture = new Furniture(req.body);
  
  try {
    await forniture.save();
    return res.status(201).send(forniture);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________


furnitureRouter.get('/furnitures', async (req, res) => {

  try {
    const furnitures = await Furniture.find({ 
      name: req.query.name,
      material: req.query.material,
      height: req.query.height,
      width: req.query.width,
      depth: req.query.depth,
      warranty: req.query.warranty,
      color: req.query.color,
      prize: req.query.prize
    });

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
    const forniture = await Furniture.findById(id);
    if (forniture) {
      return res.send(forniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________


furnitureRouter.patch('/furnitures', async (req, res) => {
  
  const allowedUpdates = ["surname", "name", "genre"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));

  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  
  try {
    const forniture = await Furniture.findOneAndUpdate({
      name: req.query.name,
      material: req.query.material,
      height: req.query.height,
      width: req.query.width,
      depth: req.query.depth,
      warranty: req.query.warranty,
      color: req.query.color,
      prize: req.query.prize
    }, req.body )

    if (forniture) {
      return res.send(forniture);
    }
    return res.status(404).send({ Error: "Furniture not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

furnitureRouter.patch('/furnitures/:id', async (req, res) => {
  
  const allowedUpdates = ["surname", "name", "genre"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));

  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  
  try {
    const forniture = await Furniture.findByIdAndUpdate(req.params.id, req.body )

    if (forniture) {
      return res.send(forniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________


furnitureRouter.delete('/furnitures', async (req, res) => {
  try {
    const forniture = await Furniture.findOneAndDelete({
      name: req.query.name,
      material: req.query.material,
      height: req.query.height,
      width: req.query.width,
      depth: req.query.depth,
      warranty: req.query.warranty,
      color: req.query.color,
      prize: req.query.prize
    });

    if (forniture) {
      return res.status(200).send(forniture);
    }
    return res.status(404).send({ Error: "Furniture not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})


furnitureRouter.delete('/furnitures/:id', async (req, res) => {
  try {
    const forniture = await Furniture.findByIdAndDelete(req.params.id);

    if (forniture) {
      return res.status(200).send(forniture);
    }
    return res.status(404).send({ Error: "Furniture ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});