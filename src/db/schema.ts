import { numeric, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
  id: uuid().primaryKey().defaultRandom(),
  description: varchar({ length: 255 }).notNull(),
  value: numeric('value', { precision: 5, scale: 2 }).notNull(),
});
