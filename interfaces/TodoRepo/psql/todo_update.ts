import { getDB } from "@/integrations/psql_db";
import { Todo } from "@/models/todo";
import { TodoRow } from "@/models/database";
import { Tag } from "@/models/tag";
import TagRepo from "@/interfaces/TagRepo/factory";
import AppError from "@/errors/AppError";

export default async function todo_update(
  id: string,
  updates: Partial<Todo>,
): Promise<Todo> {
  // throw new Error("unimplemented");
  const db = await getDB();

  const { tags: updated_tags, ...updateTodoRow } = updates;

  const result: TodoRow | undefined = await db
    .updateTable("todo")
    .set({ ...updateTodoRow })
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();

  if (!result) {
    throw new AppError({
      message: "Todo Not Found",
      httpStatusCode: 404,
      exposeToUser: true,
    });
  }

  let tags: Array<Tag>;
  const original_tags: Array<Tag> = await TagRepo.todo_tag_get_tags(id);

  if (updated_tags) {
    // NOTE: this is absolutely not the most efficient way to do this.
    // we are dropping a theoretically significant amount of tags
    // and then recreating many. For small cases this is performant enough
    // for a large volume of writes this may not be performant
    //
    // wrapping this all in one query / one transaction
    // may be useful in this regard
    //
    // future impl should track changes, remove the relations where applicable
    // this can be done with the set operation. this will return an array of
    // tags that exist in the original but not in the updated,
    // ie the tags removed from the tag list
    // ```ts
    // Array.from(
    //     original_tags: Set<Tag>.difference(updated_tags: Set<Tag>)
    // )
    // ```

    // remove all current relations between todo and tags
    await db
      .deleteFrom("todo_tag")
      .where(
        "tag_id",
        "in",
        original_tags.map((x) => x.id),
      )
      .where("todo_id", "=", id)
      .execute();

    // rebuild all tag relations, inserting new tags
    tags = await TagRepo.tag_create_multiple(updated_tags);

    await db
      .insertInto("todo_tag")
      .values(
        tags.map((tag) => ({
          todo_id: id,
          tag_id: tag.id,
        })),
      )
      .execute();
  } else {
    tags = original_tags;
  }

  return { ...result, tags: tags } as Todo;
}
