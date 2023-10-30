import express from 'express';
import productsController from '../controllers/products.controller';

export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/new', productsController.getNew);
productsRouter.get('/discount', productsController.getDiscount);
productsRouter.get('/:id', productsController.getById);
productsRouter.get('/:id/recommended', productsController.getRecommendedById);
