import { shuffle } from '../utils/shuffleArray';
import { Category, IQuery } from '../interfaces/query.interface';
import { Product } from '../models';
import { FindOptions, Op } from 'sequelize';
import { convertArrayToString } from '../utils/convertArrayToString';

const DEFAULT_LIMIT = 24;

const getAll = async (query: IQuery): Promise<Product[]> => {
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

  const products: Product[] = await Product.findAll(options);

  return products;
};

const getAllCount = async (category: Category): Promise<number> => {
  const options: FindOptions = {};

  if (category) {
    options.where = {
      category: category,
    };
  }

  const count: number = await Product.count(options);

  return count;
};

const getRecommendedById = async (id: string): Promise<Product[]> => {
  const details = id.split('-');
  const category = details[1];
  let query = '';

  if (category === 'watch') {
    if (details.length === 7) {
      query = convertArrayToString(details, '-', 0, 4);
    }

    if (details.length === 6 || details.length === 5) {
      query = convertArrayToString(details, '-', 0, 3);
    }
  }

  if (category === 'ipad') {
    query = convertArrayToString(details, '-', 0, 4);
  }

  if (category === 'iphone') {
    query = convertArrayToString(details, '-', 0, 3);
  }

  const recommended: Product[] = await Product.findAll({
    where: {
      itemId: {
        [Op.like]: query + '%',
      },
    },
  });

  return recommended;
};

const prepare = (products: Product[]): Product[] => {
  const prepared = shuffle(products);

  return prepared.slice(0, 8);
};

const getNew = async (): Promise<Product[]> => {
  const newProducts: Product[] = await Product.findAll({
    order: [['year', 'DESC']],
    limit: DEFAULT_LIMIT,
  });

  return newProducts;
};

const getDiscount = async (): Promise<Product[]> => {
  const discount: Product[] = await Product.findAll({
    order: [Product.sequelize.literal('("price"*100)/"fullPrice"')],
    limit: DEFAULT_LIMIT,
  });

  return discount;
};

export default {
  getAll,
  getAllCount,
  getRecommendedById,
  prepare,
  getNew,
  getDiscount,
};
