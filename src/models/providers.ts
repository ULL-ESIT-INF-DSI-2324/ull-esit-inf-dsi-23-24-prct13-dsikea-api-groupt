import { model, Schema, Document } from "mongoose";
import { CatergoryType } from "../variables/types.js";

/**
 * Interfaz para la creación de un objeto Proveedor que hereda de Document.
 * @property {string} cif - El Código de Identificación Fiscal del proveedor.
 * @property {string} name - El nombre del proveedor.
 * @property {string} address - La dirección del proveedor.
 * @property {number} phone - El número de teléfono del proveedor.
 * @property {CatergoryType} category - La categoría del proveedor. Puede ser 'wood', 'upholstered', 'office', 'outdoor', 'antique', 'kids', 'custom' u 'other'. Este campo es opcional.
 */
export interface ProviderInterface extends Document {
  cif: string,
  name: string,
  address: string,
  phone: number,
  category?: CatergoryType,
}

/**
 * ProviderSchema define la estructura del documento Proveedor en MongoDB.
 * Incluye los siguientes campos:
 * - cif: Una cadena que se recorta y es obligatoria. Debe tener 8 dígitos seguidos de 1 letra.
 * - name (nombre): Una cadena que se recorta y es obligatoria. No puede contener números ni algunos caracteres especiales.
 * - address (dirección): Una cadena que se recorta y es obligatoria.
 * - phone (teléfono): Un número que representa el número de teléfono del proveedor.
 * - category (categoría): Una cadena que se convierte a minúsculas, no es obligatoria, y puede ser 'wood', 'upholstered', 'office', 'outdoor', 'antique', 'kids', 'custom' u 'other'.
 * @constant {Schema<ProviderInterface>} ProviderSchema - El esquema de la colección de proveedores.
 * @constant {Model<ProviderInterface>} Provider - El modelo de la colección de proveedores.
 */
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

/**
 * exportamos el modelo Provider
 */
export const Provider = model<ProviderInterface>('Provider', ProviderSchema)