import express from 'express';

export const defaultRouter = express.Router();

/**
 * Ruta por defecto para cualquier petición HTTP no soportada.
 * @param {Request} _ - La solicitud HTTP.
 * Se encarga de devolver un estado 501 en caso de que la petición no sea soportada.
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});
