import { Todo } from "@/models/todo";
import { getDB } from "@/integrations/psql_db";
import { TodoRow } from "@/models/database";
import TagRepo from "@/interfaces/TagRepo/factory";

export default async function todo_read(id: string): Promise<Todo> {
  const db = await getDB();

  const result: TodoRow = await db
    .selectFrom("todo")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirstOrThrow();

  const tags = await TagRepo.todo_tag_get_tags(result.id);

  return { ...result, tags } as Todo;
}
