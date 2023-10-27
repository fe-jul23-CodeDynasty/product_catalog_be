import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'page_products',
  modelName: 'PageProduct',
  timestamps: false,
})
export class PageProduct extends Model {
  @Column
  namespaceId: string;
  @Column
  name: string;
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  capacityAvailable: string[];
  @Column
  capacity: string;
  @Column
  priceRegular: number;
  @Column
  priceDiscount: number;
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  colorsAvailable: string[];
  @Column
  color: string;
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  images: string[];
  @Column
  description: string;
  @Column
  screen: string;
  @Column
  resolution: string;
  @Column
  processor: string;
  @Column
  ram: string;
  @Column
  camera: string;
  @Column
  zoom: string;
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  cell: string[];
}
