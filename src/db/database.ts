import { connect } from "mongoose";

try {
  await connect('https://ull-esit-inf-dsi-23-24-prct13-dsikea-api-3m1d.onrender.com');
  console.log('Connection stablished in https://ull-esit-inf-dsi-23-24-prct13-dsikea-api-3m1d.onrender.com');
} catch (err) {
  console.log(err);
}
