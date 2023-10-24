import { Sequelize } from 'sequelize-typescript';
import { Product } from '../models';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.DB_URL;

export const sequelize = new Sequelize(URI, {
  models: [Product],
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
});

export async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
