import express from 'express';
import { IQuery } from '../interfaces/query.interface';
import productsService from './../services/products.service';

const getAllByQuery = async (req: express.Request, res: express.Response) => {
  const query: IQuery = req.query;

  const products = await productsService.getAllByQuery(query);
  const totalItems = await productsService.getAllCount();
  const totalPages = query.itemsOnPage
    ? Math.ceil(totalItems / Number(query.itemsOnPage))
    : 1;
  const currentPage = query.page ? Number(query.page) : 1;

  res.send({
    products,
    totalPages,
    currentPage,
    totalItems,
  });
};

export default { getAllByQuery };
