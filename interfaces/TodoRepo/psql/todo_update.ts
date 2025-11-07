import { Todo } from "@/models/todo";

export default async function todo_update(
  id: string,
  updates: Partial<Todo>,
): Promise<Todo> {
  throw new Error("unimplemented");
}
