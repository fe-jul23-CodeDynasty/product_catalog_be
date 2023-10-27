import express from 'express';
import { IQuery } from '../interfaces/query.interface';
import productsService from './../services/products.service';
import pageProductsService from './../services/pageProducts.service';

const getAllByQuery = async (req: express.Request, res: express.Response) => {
  const query: IQuery = req.query;

  const products = await productsService.getAllByQuery(query);
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

const getAllInfoById = async (req: express.Request, res: express.Response) => {
  const id: string = req.params.id;

  const product = await pageProductsService.getAllInfoById(id);

  res.send(product);
};

const getRecommendedById = async (
  req: express.Request,
  res: express.Response,
) => {
  const id: string = req.params.id;

  const recommended = await productsService.getRecommendedById(id);

  const preparedRecommended = productsService.prepareRecommended(recommended);

  res.send(preparedRecommended);
};

export default { getAllByQuery, getAllInfoById, getRecommendedById };
