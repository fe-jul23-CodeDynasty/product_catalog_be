import { connect, sequelize } from './utils/db';
import productsFromJson from '../api/phones.json';
import { Product } from './models';

function reset() {
  return sequelize.sync({ force: true });
}

function addProducts() {
  const products = productsFromJson;

  return Product.bulkCreate(products);
}

connect()
  .then(reset)
  .then(addProducts)
  .finally(() => {
    sequelize.close();
  });
