import { Category, IQuery } from '../interfaces/query.interface';
import { Product } from '../models';
import { FindOptions } from 'sequelize';

const getAllByQuery = async (query: IQuery) => {
  const options: FindOptions = {
    order: ['id'],
  };

  if (query.sortBy) {
    options.order = [[query.sortBy, query.direction || 'ASC']];
  }

  if (query.itemsOnPage && query.currentPage) {
    options.offset =
      (Number(query.currentPage) - 1) * Number(query.itemsOnPage);
    options.limit = Number(query.itemsOnPage);
  }

  if (query.category) {
    options.where = {
      category: query.category,
    };
  }

  const products = await Product.findAll(options);

  return products;
};

const getAllCount = async (category: Category) => {
  const options: FindOptions = {};

  if (category) {
    options.where = {
      category: category,
    };
  }

  const count = await Product.count(options);

  return count;
};

export default { getAllByQuery, getAllCount };
