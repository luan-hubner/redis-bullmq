import { Controller } from '../../../../presentation/protocols/controller';
import { ShowProducts } from './show-products';
import { HttpRequest, HttpResponse } from '../../../../presentation/protocols/http';
import { IORedis } from '../../../../redis';

export class ShowProductsController implements Controller {
  constructor(private readonly showProducts: ShowProducts) {}

  async handle(_: HttpRequest): Promise<HttpResponse> {
    try {
      const cached = await IORedis.get('products:list');

      if (cached) {
        console.log('🚀 returning cached products');

        return {
          statusCode: 200,
          body: JSON.parse(cached),
        };
      }

      const products = await this.showProducts.execute();

      // expires in 30 seconds
      await IORedis.set('products:list', JSON.stringify(products), 'EX', 30);

      return {
        statusCode: 200,
        body: products,
      };
    } catch (_error) {
      return {
        statusCode: 500,
        body: {
          message: 'someting went wrong while creating product :(',
        },
      };
    }
  }
}
