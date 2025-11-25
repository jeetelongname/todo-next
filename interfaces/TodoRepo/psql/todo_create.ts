import type { InsertTodo, Todo } from "@/models/todo";
import type { InsertTodoRow, TodoRow } from "@/models/database";
import type { Tag } from "@/models/tag";
import TagRepo from "@/interfaces/TagRepo/factory";

import { getDB } from "@/integrations/psql_db";

export default async function todo_create(todo: InsertTodo): Promise<Todo> {
  const db = await getDB();

  const insertable: InsertTodoRow = {
    title: todo.title,
    description: todo.description,
    done: false,
    deadline: new Date(todo.deadline),
    created: new Date(),
    completed: null,
  };

  // TODO: Catch on Database Errors
  const result: TodoRow = await db
    .insertInto("todo")
    .values(insertable)
    .returningAll()
    .executeTakeFirstOrThrow();

  const tags: Array<Tag> = await TagRepo.tag_create_multiple(todo.tags);

  // create relation
  await db
    .insertInto("todo_tag")
    .values(
      tags.map((tag) => ({
        todo_id: result.id,
        tag_id: tag.id,
      })),
    )
    .execute();

  return { ...result, tags: tags } as Todo;
}
