import express from 'express';
import { customerRouter } from './routers/customers.js';
import { defaultRouter } from './routers/defaults.js';

import './db/database.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(customerRouter);
app.use(defaultRouter)

app.listen(port, () => {
  console.log('Server is up on https://ull-esit-inf-dsi-23-24-prct13-dsikea-api-3m1d.onrender.com')
})