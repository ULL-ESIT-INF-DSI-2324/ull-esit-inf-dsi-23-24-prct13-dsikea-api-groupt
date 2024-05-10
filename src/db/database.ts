import { connect } from "mongoose";

/**
 * Lo que hace este script es conectarse a la base de datos de MongoDB.
 * Si la conexión es exitosa, imprime un mensaje en la consola.
 * Si la conexión falla, imprime el error en la consola.
 */
try {
  await connect('mongodb+srv://guillermoplaza:dsi@dsi-groupt-dsikea.czuoep8.mongodb.net/');
  console.log('Connection stablished in https://ull-esit-inf-dsi-23-24-prct13-dsikea-api-3m1d.onrender.com');
} catch (err) {
  console.log(err);
}

// connect('mongodb://127.0.0.1:27017/dsikea').then(() => {
//   console.log('Connected to the database');
// }).catch(() => {
//   console.log('Something went wrong when conecting to the database');
// });