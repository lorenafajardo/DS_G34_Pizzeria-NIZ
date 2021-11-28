import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Person} from './person.model';
import {Product} from './product.model';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  qtyProducts: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    required: true,
  })
  state: number;

  @property({
    type: 'string',
    required: true,
  })
  observation: string;

  @belongsTo(() => Person)
  personId: string;

  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
