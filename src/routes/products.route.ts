import express from 'express';
import productsController from '../controllers/products.controller';

export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllByQuery);
productsRouter.get('/:id', productsController.getAllInfoById);
