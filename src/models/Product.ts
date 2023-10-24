import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  modelName: 'Product',
})
export class Product extends Model {
  @Column
  category: string;
  @Column
  phoneId: string;
  @Column
  itemId: string;
  @Column
  name: string;
  @Column
  fullPrice: number;
  @Column
  price: number;
  @Column
  screen: string;
  @Column
  capacity: string;
  @Column
  color: string;
  @Column
  ram: string;
  @Column
  year: number;
  @Column
  image: string;
}
