import { Schema, model, Document } from "mongoose";

import { Color, Material } from "../variables/types.js";


export interface FurnitureInterface extends Document {
  name: string,
  material: Material,
  height: number,
  width: number,
  depth?: number,
  warranty: number,
  color?: Color,
  prize: number
}

const FurnitureSchema = new Schema<FurnitureInterface>({
  name: {
    type: String,
    trim: true,
    required: true,
    validate: (value: string) => {
      const expression = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s.\-']+$/;
      if (!expression.test(value)) {
        throw new Error("El nombre del mueble no puede contener números ni algunos carácteres especiales");
      }
    }
  },
  material: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["wood", "metal", "unpholstery", "plastic", "glass", "stone", "other"],
    required: false,
    default: "other"
  },
  height: {
    type: Number,
    min: 0,
    max: 100000,
    required: true
  },
  width: {
    type: Number,
    min: 0,
    max: 100000,
    required: true
  },
  depth: {
    type: Number,
    min: 0,
    max: 100000,
    required: false,
    default: undefined
  },
  warranty: {
    type: Number,
    min: 0,
    max: 100000
  }, 
  color: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["white", "black", "blue", "red", "yellow", "green", "brown", "gray", "other"],
    required: false,
    default: "other"
  },
  prize: {
    type: Number,
    min: 0,
  }
}, {
  timestamps: true
})

export const Furniture = model<FurnitureInterface>('Furniture', FurnitureSchema);