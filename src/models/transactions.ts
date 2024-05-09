// import { model, Schema, Document } from "mongoose";

// import { TransactionType } from "../variables/types.js";
// import { ProviderInterface } from "./providers.js";
// import { FurnitureInterface } from "./furnitures.js";
// import { CustomerInterface } from "./customers.js";

// interface TransactionInterface extends Document {
//   type: TransactionType,
//   moneyAmount: number,
//   furnitureID: FurnitureInterface,
//   providerID?: ProviderInterface,
//   customerID?: CustomerInterface
// }

// const TransactionSchema = new Schema<TransactionInterface>({
//   type: {
//     type: String,
//     trim: true,
//     enum: ["sell", "purchase"],
//   },
//   moneyAmount: {
//     type: Number,
//     min: 0
//   },
//   furnitureID: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Furniture'
//   }

// }, {
//   timestamps: true
// })