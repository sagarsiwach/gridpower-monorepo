import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export function createPlatformDatabase(connectionString: string) {
  const client = postgres(connectionString, {
    max: 5,
    prepare: false,
  });

  return {
    client,
    db: drizzle(client, { schema }),
  };
}
