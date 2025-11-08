import type { Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("todo_tag")
    .addPrimaryKeyConstraint("todo_tag_pkey", ["todo_id", "tag_id"])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("todo_tag")
    .dropConstraint("todo_tag_pkey")
    .execute();
}
