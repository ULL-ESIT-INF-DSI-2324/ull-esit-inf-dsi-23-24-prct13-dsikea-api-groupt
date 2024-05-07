import { Document, Schema, model } from "mongoose";

interface CustomerInterface extends Document {
  surname: string,
  name: string,
  identityDocument: string,
  genre?: "male" | "female" | undefined,
  dischargeDate?: Date
}

const CustomerSchema = new Schema<CustomerInterface>({
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  identityDocument: {
    type: String,
    trim: true,
    required: true,
    validate: (value: string) => {
      if(!value.match(/\b\d{8}[A-Z]/)) {
        throw new Error('Customer NIF must have 8 digits followed by 1 letter');
      }
    },
  },
  genre: {
    type: String,
    trim: true,
    enum: ['male', 'female'],
    required: false,
    default: undefined
  },
  dischargeDate: {
    type: Date,
    required: false,
    inmutable: true,
  }

})

export const Customer = model<CustomerInterface>('Customer', CustomerSchema)