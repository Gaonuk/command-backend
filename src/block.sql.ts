import { serial, pgTable, numeric } from 'drizzle-orm/pg-core';

export const block = pgTable('block', {
	id: serial('id').primaryKey(),
	last_block: numeric('last_block').notNull(),
});
