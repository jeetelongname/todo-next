import { Todo } from "@/models/todo";
import { getDB } from "@/integrations/psql_db";
import { TodoRow } from "@/models/database";
import TagRepo from "@/interfaces/TagRepo/factory";
import TodoRepo from "@/interfaces/TodoRepo/factory";

export default async function todo_read(id: string): Promise<Todo> {
  const db = await getDB();

  if (!(await TodoRepo.todo_does_exist(id))) {
    throw new Error("ID does not exist");
  }

  const result: TodoRow = await db
    .selectFrom("todo")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirstOrThrow();

  const tags = await TagRepo.todo_tag_get_tags(result.id);

  return { ...result, tags } as Todo;
}
