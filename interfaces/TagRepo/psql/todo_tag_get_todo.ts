import { Todo } from "@/models/todo";

export async function todo_tag_get_todos(
  /* tag_id: string, */
): Promise<Array<Todo>> {
  throw new Error("todo_tag_get_todos unimplemented");
}

export async function todo_tag_get_todos_multiple_tags(
  /* tag_ids: Array<string>, */
): Promise<Array<Todo> | null> {
  throw new Error("todo_tag_get_todos_multiple_tags unimplemented");
}
