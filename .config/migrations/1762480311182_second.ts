import { Kysely, sql } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("tag")
    .addColumn("id", "uuid", (col) =>
      col.defaultTo(sql`gen_random_uuid()`).primaryKey(),
    )
    .addColumn("name", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("todo_tag")
    .addColumn("todo_id", "uuid", (col) => col.references("todo.id").notNull())
    .addColumn("tag_id", "uuid", (col) => col.references("tag.id").notNull())
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("tag").execute();
  await db.schema.dropTable("todo_tag").execute();
}
