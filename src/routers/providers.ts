import express from 'express';
import { Provider } from '../models/providers.js';

export const providerRouter = express.Router()


// __________________________________________________________________POST__________________________________________________________________

providerRouter.post('/providers', async (req, res) => {
  const provider = new Provider(req.body);
  
  try {
    await provider.save();
    return res.status(201).send(provider);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________


providerRouter.get('/providers', async (req, res) => {
  const filter = req.query.cif? {cif: req.query.cif.toString()} : {};

  
  try {
    const providers = await Provider.find(filter);

    if (providers.length !== 0) {
      return res.send(providers);
    }
    return res.status(404).send({ Error: "Provider cif not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})


providerRouter.get('/providers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const provider = await Provider.findById(id);
    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})

// __________________________________________________________________PATCH_________________________________________________________________


providerRouter.patch('/providers', async (req, res) => {
  
  const allowedUpdates = ["cif", "name", "address", "phone", "category"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));

  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  
  try {
    const provider = await Provider.findOneAndUpdate({
      cif: req.query.cif
    }, req.body )

    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider cif not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

providerRouter.patch('/providers/:id', async (req, res) => {
  
  const allowedUpdates = ["cif", "name", "address", "phone", "category"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));

  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body )

    if (provider) {
      return res.send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________


providerRouter.delete('/providers', async (req, res) => {
  try {
    const provider = await Provider.findOneAndDelete({
      cif: req.query.cif
    });

    if (provider) {
      return res.status(200).send(provider);
    }
    return res.status(404).send({ Error: "Provider cif not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})


providerRouter.delete('/providers/:id', async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (provider) {
      return res.status(200).send(provider);
    }
    return res.status(404).send({ Error: "Provider ID not found" });
  } catch (error) {
    return res.status(500).send(error)
  }
});