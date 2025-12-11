import type { Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("user")
    .addColumn("google_id", "text", (col) =>
      col.unique()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("user")
    .dropColumn("google_id")
    .execute();
}
