import { model, Schema, Document } from "mongoose";
import { TransactionType } from "../variables/types.js";
import { ProviderInterface } from "./providers.js";
import { FurnitureInterface } from "./furnitures.js";
import { CustomerInterface } from "./customers.js";

/**
 * Interfaz para la creación de un objeto Transacción que hereda de Document.
 * @property {TransactionType} type - El tipo de transacción. Puede ser 'sell' (venta) o 'purchase' (compra). Este campo es opcional.
 * @property {number} moneyAmount - La cantidad de dinero de la transacción.
 * @property {FurnitureInterface} furnitureID - El ID del mueble
 * @property {ProviderInterface} providerID - El ID del proveedor. Este campo es opcional.
 * @property {CustomerInterface} customerID - El ID del cliente. Este campo es opcional.
 */
interface TransactionInterface extends Document {
  type: TransactionType,
  productCode: string,
  providerCIF?: string,
  customerNIF?: string,
  moneyAmount: number,
  furnitureID: FurnitureInterface,
  providerID?: ProviderInterface,
  customerID?: CustomerInterface
}

/**
 * TransactionSchema define la estructura del documento Transacción en MongoDB.
 * Incluye los siguientes campos:
 * - type (tipo): Una cadena que se recorta, no es obligatoria, y puede ser 'sell' (venta) o 'purchase' (compra).
 * - moneyAmount (cantidad de dinero): Un número que debe ser mayor o igual a 0.
 * - furnitureID (ID del mueble): Un ObjectId que es obligatorio y hace referencia a un documento Mueble.
 * - providerID (ID del proveedor): Un ObjectId que es opcional y hace referencia a un documento Proveedor.
 * - customerID (ID del cliente): Un ObjectId que es opcional y hace referencia a un documento Cliente.
 */
const TransactionSchema = new Schema<TransactionInterface>({
  type: {
    type: String,
    trim: true,
    required: true,
    enum: ["sell", "purchase"],
  },
  productCode: {
    type: String,
    trim: true,
    required: true
  },
  providerCIF: {
    type: String,
    trim: true,
    required: false,
    default: undefined
  },
  customerNIF: {
    type: String,
    trim: true,
    required: false,
    default: undefined
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

/**
 * Exportamos el modelo Transaction.
 */
export const Transaction = model<TransactionInterface>('Transaction', TransactionSchema);