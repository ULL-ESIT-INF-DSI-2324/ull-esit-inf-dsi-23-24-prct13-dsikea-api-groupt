import { model, Schema, Document } from "mongoose";

type CatergoryType = "wood" | "upholstered" | "office" | "outdoor" | "antique" | "kids" | "custom" | "other";

interface ProviderInterface extends Document {
  name: string,
  address: string,
  phone: number,
  dischargeDate: Date,
  category?: CatergoryType,
}

const ProviderSchema = new Schema<ProviderInterface>({
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
      if (value.toString.length !== 9) {
        throw new Error("Número de teléfono válido");
      }
    }
  },
  dischargeDate: {
    type: Date,
    required: false,
    inmutable: true,
  },
  category: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["wood", "upholstered", "office", "outdoor", "antique", "kids", "custom", "other"],
    required: false,
    default: "other"
  }
})

export const Provider = model<ProviderInterface>('Provider', ProviderSchema)