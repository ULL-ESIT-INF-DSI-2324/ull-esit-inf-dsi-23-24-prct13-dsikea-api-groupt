import { model, Schema, Document } from "mongoose";

import { TransactionType } from "../variables/types.js";
import { ProviderInterface } from "./providers.js";
import { FurnitureInterface } from "./furnitures.js";
import { CustomerInterface } from "./customers.js";

interface TransactionInterface extends Document {
  type?: TransactionType,
  moneyAmount: number,
  furnitureID: FurnitureInterface,
  providerID?: ProviderInterface
  customerID?: CustomerInterface
}

const TransactionSchema = new Schema<TransactionInterface>({
  type: {
    type: String,
    trim: true,
    required: false,
    default: undefined,
    enum: ["sell", "purchase"],
  },
  moneyAmount: {
    type: Number,
    min: 0
  },
  furnitureID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Furniture'
  },
  providerID: {
    type: Schema.Types.ObjectId,
    required: false,
    default: undefined,
    ref: 'Provider'
  },
  customerID: {
    type: Schema.Types.ObjectId,
    required: false,
    default: undefined,
    ref: 'Customer'
  }

}, {
  timestamps: true
});

export const Transaction = model<TransactionInterface>('Transaction', TransactionSchema);