/**
 * Tipo de dato para el género de una persona
 * Puede ser femenino, masculino o undefined
 * @typedef {string} Genre
 */
export type Genre = "male" | "female" | undefined;

/**
 * Tipo de dato para el color de un mueble.
 * Puede ser "white", "black", "blue", "red", "yellow", "green", "brown", "gray" u "other".
 * @typedef {string} Color
 */
export type Color = "white" | "black" | "blue" | "red" | "yellow" | "green" | "brown" | "gray" | "other";

/**
 * Tipo de dato para el material de un mueble.
 * Puede ser "wood", "metal", "unpholstery", "plastic", "glass", "stone" u "other".
 * @typedef {string} Material
 */
export type Material = "wood" | "metal" | "unpholstery" | "plastic" | "glass" | "stone" | "other";

/**
 * Tipo de dato para el tipo de transacción.
 * Puede ser "sell", "purchase".
 * @typedef {string} TransactionType
 */
export type TransactionType = "sell" | "purchase";

/**
 * Tipo de dato para el tipo de categoría de muebles.
 * Puede ser "wood", "upholstered", "office", "outdoor", "antique", "kids", "custom" u "other".
 * @typedef {string} CatergoryType
 */
export type CatergoryType = "wood" | "upholstered" | "office" | "outdoor" | "antique" | "kids" | "custom" | "other";
