import { Todo } from "@/models/todo";
import { getDB } from "@/integrations/psql_db";
import { TodoRow } from "@/models/database";
import { Tag } from "@/models/tag";

export default async function todo_read(id: string): Promise<Todo> {
  const db = await getDB();

  const result: TodoRow = await db
    .selectFrom("todo")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirstOrThrow();

  const tags: Array<Tag> = await db
    .selectFrom("tag")
    .select(["tag.id", "tag.name"])
    .innerJoin("todo_tag", "todo_tag.tag_id", "tag.id")
    .innerJoin("todo", "todo_tag.todo_id", "todo.id")
    .where("todo.id", "=", result.id)
    .execute();

  return { ...result, tags } as Todo;
}
