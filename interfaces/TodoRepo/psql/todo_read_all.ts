import { getDB } from "@/integrations/psql_db";
import TagRepo from "@/interfaces/TagRepo/factory";
import { TodoRow } from "@/models/database";
import { Todo } from "@/models/todo";

export default async function todo_read_all(): Promise<Array<Todo>> {
  const db = await getDB();

  const result: Array<TodoRow> = await db
    .selectFrom("todo")
    .selectAll()
    .execute();

  const todos: Array<Promise<Todo>> = result.map(async (todoRow: TodoRow) => {
    const tags = await TagRepo.todo_tag_get_tags(todoRow.id);
    return { ...todoRow, tags: tags } as Todo;
  });

  return await Promise.all(todos);
}
