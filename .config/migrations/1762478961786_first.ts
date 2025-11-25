import { Kysely, sql } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
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

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("todo").execute();
}
