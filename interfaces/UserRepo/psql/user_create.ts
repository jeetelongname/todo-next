import type { InsertUser, User } from "@/models/user";
import type { InsertUserRow, UserRow } from "@/models/database";
import { getDB } from "@/integrations/psql_db";

export default async function user_create(user: InsertUser): Promise<User> {
  const db = await getDB();

  const insertable: InsertUserRow = {
    email: user.email,
    name: user.name,
  };

  if (user.pass_hash) {
    insertable.pass_hash = user.pass_hash
  }

  // TODO: Catch on Database Errors
  const result: UserRow = await db
    .insertInto("user")
    .values(insertable)
    .returningAll()
    .executeTakeFirstOrThrow();

  return { ...result } as User;
}
