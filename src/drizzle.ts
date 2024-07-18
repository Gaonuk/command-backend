import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { Resource } from "sst";

const client = new RDSDataClient({});

export const db = drizzle(client, {
	database: Resource.CommandDatabase.database,
	secretArn: Resource.CommandDatabase.secretArn,
	resourceArn: Resource.CommandDatabase.clusterArn,
});
