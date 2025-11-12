import { getDB } from "@/integrations/psql_db";
import TagRepo from "@/interfaces/TagRepo/factory";
import { Tag } from "@/models/tag";
import TodoRepo from "@/interfaces/TodoRepo/factory";

export default async function todo_delete(id: string): Promise<boolean> {
  const db = await getDB();

  if (!(await TodoRepo.todo_does_exist(id))) {
    throw new Error("ID does not exist");
  }

  const original_tags: Array<Tag> = await TagRepo.todo_tag_get_tags(id);

  await db
    .deleteFrom("todo_tag")
    .where(
      "tag_id",
      "in",
      original_tags.map((x) => x.id),
    )
    .where("todo_id", "=", id)
    .execute();

  const result = await db
    .deleteFrom("todo")
    .where("id", "=", id)
    .executeTakeFirst();

  return result.numDeletedRows > 0;
}
