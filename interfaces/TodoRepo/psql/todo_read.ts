import { getDB } from "@/integrations/psql_db";
import TagRepo from "@/interfaces/TagRepo/factory";
import AppError from "@/errors/AppError";
import type { TodoRow } from "@/models/database";
import type { Tag } from "@/models/tag";
import type { Todo } from "@/models/todo";

export default async function todo_read(id: string): Promise<Todo> {
  const db = await getDB();
  let tags: Array<Tag> = [];

  const result: TodoRow | undefined = await db
    .selectFrom("todo")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (result === undefined) {
    throw new AppError({
      message: "Todo Item not found",
      httpStatusCode: 404,
      exposeToUser: true,
    });
  }

  if (result) {
    tags = await TagRepo.todo_tag_get_tags(result.id);
  }

  return { ...result, tags } as Todo;
}
