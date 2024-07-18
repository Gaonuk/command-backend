import { text, serial, pgTable } from 'drizzle-orm/pg-core';

export const transaction = pgTable('transaction', {
	id: serial('id').primaryKey(),
	function_name: text('function_name').notNull(),
	args: text('args').array().notNull(),
	wallet: text('wallet').notNull(),
	timestamp: text('timestamp').notNull(),
});
