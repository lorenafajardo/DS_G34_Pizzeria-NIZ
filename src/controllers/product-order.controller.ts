import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  Order,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductOrderController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<Order> {
    return this.productRepository.order(id);
  }
}
