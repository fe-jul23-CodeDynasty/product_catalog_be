import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.route';

export function createServer() {
  const app = express();

  app.use(cors());

  app.use('/products', express.json(), productsRouter);

  return app;
}
