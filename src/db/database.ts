import mongoose from "mongoose";

/**
 * Lo que hace este script es conectarse a la base de datos de MongoDB.
 * Si la conexión es exitosa, imprime un mensaje en la consola.
 * Si la conexión falla, imprime el error en la consola.
 */
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://guillermoplaza:dsi@dsi-groupt-dsikea.czuoep8.mongodb.net/');
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

/**
 * Lo que hace este script es cerrar la conexión a la base de datos de MongoDB.
 * Si la conexión se cierra exitosamente, imprime un mensaje en la consola.
 * Si la conexión falla, imprime el error en la consola.
 */
export const closeDB = async () => {
  try { 
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};