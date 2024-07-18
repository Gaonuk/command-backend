import { Resource } from 'sst';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	driver: 'aws-data-api',
	dialect: 'postgresql',
	dbCredentials: {
		database: Resource.CommandDatabase.database,
		secretArn: Resource.CommandDatabase.secretArn,
		resourceArn: Resource.CommandDatabase.clusterArn,
	},
	// Pick up all our schema files
	schema: ['./src/**/*.sql.ts'],
	out: './migrations',
});
