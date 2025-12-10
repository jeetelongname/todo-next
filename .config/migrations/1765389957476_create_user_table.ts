import type { Kysely } from 'kysely'

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("user")
		.addColumn("id", "uuid")
		.addColumn("email", "text")
		.addColumn("pass_hash", "text")
		.addColumn("name", "text")
		.execute()

}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("user").execute()
}
