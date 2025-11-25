import { Kysely, sql } from "kysely";
import { Database } from "@/models/database";
import { getDb } from "@/integrations/psql_db";

export async function seed(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("todo")
    .addColumn("id", "uuid", (col) =>
      col.defaultTo(sql`gen_random_uuid()`).primaryKey(),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("done", "boolean", (col) => col.notNull())
    .addColumn("deadline", "date", (col) => col.notNull())
    .addColumn("created", "date", (col) => col.notNull())
    .addColumn("completed", "date")
    .execute();
}
