import { Kysely, sql } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('token')
    .addColumn("id", "uuid", (col) =>
      col.defaultTo(sql`gen_random_uuid()`).primaryKey(),
    )
    .addColumn('user_id', 'uuid', (col) =>
      col.notNull().references('user.id')
    )
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('expires_at', 'timestamp', (col) => col.notNull())
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('revoked_at', 'timestamp')
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('token').execute();
}
