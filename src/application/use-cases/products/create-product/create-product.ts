import { infer as zInfer } from 'zod';
import { productSchema } from './create-product.controller';
import { productsTable } from '../../../../db/schema';
import { db } from '../../../../db';

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

    return product.id;
  }
}
