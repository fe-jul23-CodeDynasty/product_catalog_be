import { IQuery } from '../interfaces/query.interface';
import { Product } from '../models';
import { FindOptions } from 'sequelize';

const getAllByQuery = async (query: IQuery) => {
  const options: FindOptions = {
    order: ['id'],
  };

  if (query.sortBy) {
    options.order = [[query.sortBy, query.direction || 'ASC']];
  }

  if (query.itemsOnPage && query.page) {
    options.offset = (Number(query.page) - 1) * Number(query.itemsOnPage);
    options.limit = Number(query.itemsOnPage);
  }

  const products = await Product.findAll(options);

  return products;
};

const getAllCount = async () => {
  const count = await Product.count();

  return count;
};

export default { getAllByQuery, getAllCount };
