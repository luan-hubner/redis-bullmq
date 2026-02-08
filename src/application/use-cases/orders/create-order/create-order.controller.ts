import { z, ZodError } from 'zod';
import { Controller } from '../../../../presentation/protocols/controller';
import { CreateOrder } from './create-order';
import { HttpRequest, HttpResponse } from '../../../../presentation/protocols/http';

export const orderSchema = z.object({
  productId: z.string().min(3),
  userEmail: z.email(),
  quantity: z.number().min(1),
});

export class CreateOrderController implements Controller {
  constructor(private readonly createOrder: CreateOrder) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const data = orderSchema.parse(request.body);

      const orderId = await this.createOrder.execute(data);

      return {
        statusCode: 201,
        body: { id: orderId },
      };
    } catch (_error) {
      if (_error instanceof ZodError) {
        return {
          statusCode: 400,
          body: {
            message: 'provided order is invalid :x',
          },
        };
      }

      console.log(_error);
      return {
        statusCode: 500,
        body: {
          message: 'someting went wrong while creating order :(',
        },
      };
    }
  }
}
