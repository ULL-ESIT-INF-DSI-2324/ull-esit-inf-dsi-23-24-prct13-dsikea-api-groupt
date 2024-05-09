import express from 'express';
import { Customer } from '../models/customers.js';

export const customerRouter = express.Router()


// __________________________________________________________________POST__________________________________________________________________

customerRouter.post('/customers', async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  
  try {
    await customer.save();
    return res.status(201).send(customer);
  } catch (error) {
    return res.status(500).send(error)
  }
});


// ___________________________________________________________________GET__________________________________________________________________


customerRouter.get('/customers', async (req, res) => {
  const { nif } = req.query;
  
  try {
    const customers = await Customer.find({ customerNif: nif?.toString() });

    if (customers.length !== 0) {
      return res.send(customers);
    }
    return res.status(404).send({ Error: "Customer NIF not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})


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


customerRouter.patch('/customers', async (req, res) => {
  
  const allowedUpdates = ["surname", "name", "genre"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));

  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  
  try {
    const customer = await Customer.findOneAndUpdate({
      nif: req.query.nif
    }, req.body )

    if (customer) {
      return res.send(customer);
    }
    return res.status(404).send({ Error: "Customer NIF not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  } 
});

customerRouter.patch('/customers/:id', async (req, res) => {
  
  const allowedUpdates = ["surname", "name", "genre"];
  const requestedUpdates = Object.keys(req.body);

  const isValidrequest = requestedUpdates.every((data) => allowedUpdates.includes(data));

  if (!isValidrequest) {
    return res.status(400).send({ Error: "Invalid update" });
  }
  
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body )

    if (customer) {
      return res.send(customer);
    }
    return res.status(404).send({ Error: "Customer ID not found" }); 

  } catch (error) {
    return res.status(500).send(error);
  }  
});


// __________________________________________________________________DELETE_________________________________________________________________


customerRouter.delete('/customers', async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      nif: req.query.nif
    });

    if (customer) {
      return res.status(200).send(customer);
    }
    return res.status(404).send({ Error: "Customer NIF not found" });
  } catch (error) {
    return res.status(500).send(error)
  }

})


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