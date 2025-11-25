import { getDB } from "@/integrations/psql_db";

export default async function todo_does_exist(id: string): Promise<Boolean> {
  const db = await getDB();

  const result: { exists: Boolean } = await db
    .selectNoFrom((eb) =>
      eb.exists((db) => db.selectFrom("todo").where("id", "=", id).limit(1)),
    )
    .executeTakeFirstOrThrow();

  console.log(result);

  return result.exists;
}
