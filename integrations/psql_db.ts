import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "@/models/database";

let db: Kysely<Database>;

// singleton pattern
export async function getDB() {
  // Create new pool and Kysely instance

  if (!db) {
    db = new Kysely({
      dialect: new PostgresDialect({
        // now of course in real code these would be env variables
        // but as this is only being run on my local machine this is fine for the time being
        pool: new Pool({
          user: "postgres",
          password: "dev",
          host: "localhost",
          port: 5432,
          database: "todo",

          max: 5,
        }),
      }),
    });
  }

  return db;
}
