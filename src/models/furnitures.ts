import { Schema, model, Document } from "mongoose";
import { Color, Material } from "../variables/types.js";

/**
 * Interfaz para la creación de un objeto Mueble que hereda de Document.
 * @property {string} name - El nombre del mueble.
 * @property {string} productCode - El código de producto del mueble.
 * @property {Material} material - El material del mueble.
 * @property {number} height - La altura del mueble.
 * @property {number} width - La anchura del mueble.
 * @property {number} depth - La profundidad del mueble. Esta es una propiedad opcional.
 * @property {number} warranty - El período de garantía del mueble en años.
 * @property {Color} color - El color del mueble. Esta es una propiedad opcional.
 * @property {number} prize - El precio del mueble.
 */
export interface FurnitureInterface extends Document {
  name: string,
  productCode: string,
  material: Material,
  height: number,
  width: number,
  depth?: number,
  warranty: number,
  color?: Color,
  prize: number
}

/**
 * FurnitureSchema define la estructura del documento Mueble en MongoDB.
 * Incluye los siguientes campos:
 * - name (nombre): Una cadena que se recorta y es obligatoria. No puede contener números ni algunos caracteres especiales.
 * - productCode (código de producto): Una cadena que es obligatoria.
 * - material: Un valor de tipo Material que es obligatorio.
 * - height (altura), width (anchura), depth (profundidad): Números que representan las dimensiones del mueble. Depth es opcional.
 * - warranty (garantía): Un número que representa el período de garantía del mueble en años.
 * - color: Un valor de tipo Color que es opcional.
 * - prize (precio): Un número que representa el precio del mueble.
 */
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
  productCode: {
    type: String,
    trim: true,
    required: true,
    unique: true
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