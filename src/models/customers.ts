import { Document, Schema, model } from "mongoose";
import { Genre } from "../variables/types.js";

/**
 * Interfaz para la creación de un objeto Cliente que hereda de Document.
 * @property {string} surname - El apellido del cliente.
 * @property {string} name - El nombre del cliente.
 * @property {string} nif - El NIF del cliente. Debe tener 8 dígitos seguidos de 1 letra.
 * @property {string} genre - El género del cliente. Puede ser 'male' (masculino) o 'female' (femenino). Este campo es opcional.
 */
export interface CustomerInterface extends Document {
  surname: string,
  name: string,
  nif: string,
  genre?: Genre,
}

/**
 * CustomerSchema define la estructura del documento Cliente en MongoDB.
 * Incluye los siguientes campos:
 * - surname (apellido): Una cadena que se recorta y es obligatoria.
 * - name (nombre): Una cadena que se recorta y es obligatoria.
 * - nif: Una cadena única que se recorta y es obligatoria. Debe tener 8 dígitos seguidos de 1 letra.
 * - genre (género): Una cadena que se recorta, no es obligatoria, y puede ser 'male' (masculino) o 'female' (femenino). Se convierte a minúsculas.
 */
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
  nif: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: (value: string) => {
      const expression = /\b\d{8}[A-Z]$/
      if(!expression.test(value)) { 
        throw new Error('NIF del cliente debe tener 8 dígitos seguidos de 1 letra');
      }
    },
  },
  genre: {
    lowercase: true,
    type: String,
    trim: true,
    enum: ['male', 'female'],
    required: false,
    default: undefined
  },
}, {
  timestamps: true
})

// exportamos el modelo Customer
export const Customer = model<CustomerInterface>('Customer', CustomerSchema)