import type { InsertTodo, Todo } from "@/models/todo";
import type { InsertTagRow, InsertTodoRow, TodoRow } from "@/models/database";
import type { Tag } from "@/models/tag";

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

  const tags: Array<Tag> = await db
    .with("res", (db) =>
      db
        .insertInto("tag")
        .values(todo.tags.map((tagName) => ({ name: tagName }) as InsertTagRow))
        .onConflict((oc) => oc.column("name").doNothing())
        .returningAll(),
    )
    .selectFrom("res")
    .selectAll()
    .unionAll(
      db
        .selectFrom("tag")
        .selectAll()
        .where("name", "in", todo.tags as Array<string>),
    )
    .execute();

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
