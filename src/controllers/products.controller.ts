import express from 'express';
import { IQuery } from '../interfaces/query.interface';
import productsService from './../services/products.service';
import pageProductsService from './../services/pageProducts.service';
import statusCodes from './../constants/statusCodes';

const getAll = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const query: IQuery = req.query;

  const products = await productsService.getAll(query);
  const totalItems = await productsService.getAllCount(query.category);
  const totalPages = query.itemsOnPage
    ? Math.ceil(totalItems / Number(query.itemsOnPage))
    : 1;
  const currentPage = query.currentPage ? Number(query.currentPage) : 1;

  res.send({
    products,
    totalPages,
    currentPage,
    totalItems,
  });
};

const getById = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const id: string = req.params.id;

  const product = await pageProductsService.getById(id);

  if (!product) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.send(product);
};

const getRecommendedById = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const id: string = req.params.id;

  const product = await pageProductsService.getById(id);

  if (!product) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  const recommended = await productsService.getRecommendedById(id);

  const preparedRecommended = productsService.prepare(recommended);

  res.send(preparedRecommended);
};

const getNew = async (
  _req: express.Request,
  res: express.Response,
): Promise<void> => {
  const newProducts = await productsService.getNew();

  const preparedNewProducts = productsService.prepare(newProducts);

  res.send(preparedNewProducts);
};

const getDiscount = async (
  _req: express.Request,
  res: express.Response,
): Promise<void> => {
  const discount = await productsService.getDiscount();

  const preparedDiscount = productsService.prepare(discount);

  res.send(preparedDiscount);
};

export default { getAll, getById, getRecommendedById, getNew, getDiscount };
