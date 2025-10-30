import { Todo, InsertTodo } from "@/models/todo";
import { Tag } from "@/models/tag";

export default interface TodoRepo {
  // Todo CRUD
  todo_create(todo: InsertTodo): Promise<Todo>;
  todo_read(id: string): Promise<Todo | null>;
  todo_update(id: string, updates: Partial<Todo>): Promise<Todo>;
  todo_delete(id: string): Promise<Boolean>;

  // FIXME: These will need to be constrained to a user
  todo_tag_get_tags(todo_id: string): Promise<Array<Tag> | null>;
}
