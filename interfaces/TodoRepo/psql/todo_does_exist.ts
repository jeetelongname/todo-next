import { getDB } from "@/integrations/psql_db";

export default async function todo_does_exist(id: string): Promise<boolean> {
  const db = await getDB();

  const result = await db
    .selectFrom("todo")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  return !!result // !! coerce to boolean
}
