import { model, Schema, Document } from "mongoose";
import { CatergoryType } from "../variables/types.js";

export interface ProviderInterface extends Document {
  cif: string,
  name: string,
  address: string,
  phone: number,
  category?: CatergoryType,
}

const ProviderSchema = new Schema<ProviderInterface>({
  cif: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: (value: string) => {
      const regexCIF = /^[A-HJNPQRSUVW]{1}[0-9]{7}[0-9A-J]$/i;
      if(!regexCIF.test(value)) {
        throw new Error("El Código de Identificación Fiscal no es válido")
      }
    }
  },
  name: {
    type: String,
    trim: true,
    required: true,
    validate: (value: string) => {
      const expression = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s.\-']+$/;
      if (!expression.test(value)) {
        throw new Error("El nombre del proveedor no puede contener números ni algunos carácteres especiales");
      }
    }
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value.toString().length !== 9) {
        throw new Error("Número de teléfono válido");
      }
    }
  },
  category: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["wood", "upholstered", "office", "outdoor", "antique", "kids", "custom", "other"],
    required: false,
    default: "other"
  }
}, {
  timestamps: true
})

export const Provider = model<ProviderInterface>('Provider', ProviderSchema)