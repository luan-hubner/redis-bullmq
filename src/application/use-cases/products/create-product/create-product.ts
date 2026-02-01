import { infer as zInfer } from 'zod';
import { productSchema } from './create-product.controller';
import { productsTable } from '../../../../db/schema';
import { db } from '../../../../db';
import { productQueue } from '../../../../infra/queue/product.queue';
import { IORedis } from '../../../../redis';

type createProductDTO = zInfer<typeof productSchema>;

export class CreateProduct {
  constructor() {}

  async execute(data: createProductDTO): Promise<string> {
    const [product] = await db
      .insert(productsTable)
      .values({
        description: data.description,
        value: data.value.toFixed(2),
      })
      .returning({ id: productsTable.id });

    if (!product) {
      throw new Error();
    }

    // add product on queue to be cached
    // just 4fun
    await productQueue.add(
      'create-product',
      {
        id: product.id,
        description: data.description,
        value: data.value,
      },
      {
        jobId: product.id,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
        removeOnComplete: {
          age: 86400,
          count: 500,
        },
      },
    );

    // cache cleanup
    await IORedis.del('products:list');

    return product.id;
  }
}
