CREATE TABLE IF NOT EXISTS "block" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_block" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"function_name" text NOT NULL,
	"args" text[] NOT NULL,
	"wallet" text NOT NULL,
	"timestamp" text NOT NULL
);
