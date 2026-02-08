import { numeric, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
  id: uuid().primaryKey().defaultRandom(),
  description: varchar({ length: 255 }).notNull(),
  value: numeric('value', { precision: 5, scale: 2 }).notNull(),
});

export const ordersTable = pgTable('orders', {
  id: uuid().primaryKey().defaultRandom(),
  productId: uuid('product_id')
    .notNull()
    .references(() => productsTable.id, {
      onDelete: 'cascade',
    }),
  userEmail: varchar('user_email', { length: 255 }).notNull(),
  quantity: numeric('quantity', { precision: 5, scale: 2 }).notNull(),
});
