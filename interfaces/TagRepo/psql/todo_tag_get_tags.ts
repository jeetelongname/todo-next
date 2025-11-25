import { getDB } from "@/integrations/psql_db";
import { Tag } from "@/models/tag";

export default async function todo_tag_get_todos(
  todo_id: string,
): Promise<Array<Tag>> {
  const db = await getDB();

  return await db
    .selectFrom("tag")
    .select(["tag.id", "tag.name"])
    .innerJoin("todo_tag", "todo_tag.tag_id", "tag.id")
    .innerJoin("todo", "todo_tag.todo_id", "todo.id")
    .where("todo.id", "=", todo_id)
    .execute();
}
