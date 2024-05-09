import express from 'express';
import cors from 'cors';

import { customerRouter } from './routers/customers.js';
import { furnitureRouter } from './routers/furniture.js'
import { defaultRouter } from './routers/defaults.js';
import { providerRouter } from './routers/providers.js';

import './db/database.js'

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(customerRouter);
app.use(furnitureRouter);
app.use(providerRouter);
app.use(defaultRouter);

app.listen(port, () => {
  console.log('Server is up on https://ull-esit-inf-dsi-23-24-prct13-dsikea-api-3m1d.onrender.com')
})