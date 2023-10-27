'use strict';
const tablets = require('../public/api/tablets.json');
const accessories = require('../public/api/accessories.json');
const phones = require('../public/api/phones.json');

const pageProducts = [...phones, ...tablets, ...accessories].map(product => ({
  ...product,
  description: JSON.stringify(product.description),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('page_products', pageProducts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('page_products', null, {});
  },
};
