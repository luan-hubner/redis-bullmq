import { infer as zInfer } from 'zod';
import { orderSchema } from './create-order.controller';
import { ordersTable } from '../../../../db/schema';
import { db } from '../../../../db';
import { redisPublisher } from '../../../../redis';

type createOrderDTO = zInfer<typeof orderSchema>;

export class CreateOrder {
  constructor() {}

  async execute(data: createOrderDTO): Promise<string> {
    const [order] = await db
      .insert(ordersTable)
      .values({
        userEmail: data.userEmail,
        productId: data.productId,
        quantity: data.quantity.toFixed(2),
      })
      .returning({ id: ordersTable.id });

    if (!order) {
      throw new Error();
    }

    await redisPublisher.connect();

    await redisPublisher.publish(
      'order:created',
      JSON.stringify({
        id: order.id,
        userEmail: data.userEmail,
        productId: data.productId,
        quantity: data.quantity,
      }),
    );

    redisPublisher.destroy();

    return order.id;
  }
}
