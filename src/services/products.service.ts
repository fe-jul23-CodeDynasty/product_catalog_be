import { shuffle } from '../utils/shuffleArray';
import { Category, IQuery } from '../interfaces/query.interface';
import { Product } from '../models';
import { FindOptions, Op } from 'sequelize';

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

const getRecommendedById = async (id: string) => {
  const details = id.split('-');
  const category = details[1];
  let query;

  if (category === 'watch') {
    if (details.length === 7) {
      query = details.slice(0, 4).join('-');
    }

    if (details.length === 6 || details.length === 5) {
      query = details.slice(0, 3).join('-');
    }
  }

  if (category === 'ipad') {
    query = details.slice(0, 4).join('-');
  }

  if (category === 'iphone') {
    query = details.slice(0, 3).join('-');
  }

  const recommended = await Product.findAll({
    where: {
      itemId: {
        [Op.like]: query + '%',
      },
    },
  });

  return recommended;
};

const prepareRecommended = (recommended: Product[]) => {
  const shuffleRecommended = shuffle(recommended);

  return shuffleRecommended.slice(0, 8);
};

export default {
  getAllByQuery,
  getAllCount,
  getRecommendedById,
  prepareRecommended,
};
