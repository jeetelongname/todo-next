import type { InsertTodo, Todo } from "@/models/todo";
import type { InsertTodoRow, TodoRow } from "@/models/database";
import type { Tag } from "@/models/tag";
import TagRepo from "@/interfaces/TagRepo/factory";

import { getDB } from "@/integrations/psql_db";

export default async function todo_create(todo: InsertTodo): Promise<Todo> {
  // throw new Error("psql backend unimplemented");
  const db = await getDB();

  const insertable: InsertTodoRow = {
    title: todo.title,
    description: todo.description,
    done: false,
    deadline: new Date(todo.deadline),
    created: new Date(),
    completed: null,
  };

  const result: TodoRow = await db
    .insertInto("todo")
    .values(insertable)
    .returningAll()
    .executeTakeFirstOrThrow();

  const tags: Array<Tag> = await TagRepo.tag_create_multiple(todo.tags);

  await db
    .insertInto("todo_tag")
    .values(
      tags.map((tag) => ({
        todo_id: result.id,
        tag_id: tag.id,
      })),
    )
    .execute();

  // create relation
  return { ...result, tags: tags } as Todo;
}
