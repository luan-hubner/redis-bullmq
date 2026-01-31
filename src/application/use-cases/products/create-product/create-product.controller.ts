import { z, ZodError } from 'zod';
import { Controller } from '../../../../presentation/protocols/controller';
import { CreateProduct } from './create-product';
import { HttpRequest, HttpResponse } from '../../../../presentation/protocols/http';

export const productSchema = z.object({
  description: z.string().min(3),
  value: z.number(),
});

export class CreateProductController implements Controller {
  constructor(private readonly createProduct: CreateProduct) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const data = productSchema.parse(request.body);

      const productId = await this.createProduct.execute(data);

      return {
        statusCode: 201,
        body: { id: productId },
      };
    } catch (_error) {
      if (_error instanceof ZodError) {
        return {
          statusCode: 400,
          body: {
            message: 'provided product is invalid :x',
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          message: 'someting went wrong while creating product :(',
        },
      };
    }
  }
}
