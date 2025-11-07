import { Todo } from "@/models/todo";
import { Tag, InsertTag } from "@/models/tag";

export default interface TagRepo {
  // Tag CRUD
  tag_create(tag: InsertTag): Promise<Tag>;
  tag_read(id: string): Promise<Tag | null>;
  // no update as tags store only their name
  tag_delete(id: string): Promise<boolean>;

  // FIXME: These will need to be constrained to a user
  // get all todos with a tag.
  todo_tag_get_todos(tag_id: string): Promise<Array<Todo> | null>;
  // This function will get all todos with all tags specified
  todo_tag_get_todos_multiple_tags(
    tag_ids: Array<string>,
  ): Promise<Array<Todo> | null>;
}
