import { productsTable } from '../../../../db/schema';
import { db } from '../../../../db';

type Product = {
  id: string;
  description: string;
  value: string;
};

export class ShowProducts {
  constructor() {}

  async execute(): Promise<Product[]> {
    const products = await db.select().from(productsTable);
    return products;
  }
}
