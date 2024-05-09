import { connect } from "mongoose";

try {
  await connect('mongodb+srv://guillermoplaza:Seguridad23@dsi-groupt-dsikea.czuoep8.mongodb.net/');
  console.log('Connection stablished in https://ull-esit-inf-dsi-23-24-prct13-dsikea-api-3m1d.onrender.com');
} catch (err) {
  console.log(err);
}
