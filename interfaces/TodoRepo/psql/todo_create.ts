import { InsertTodo, Todo } from "@/models/todo";

export default async function todo_create(todo: InsertTodo): Promise<Todo> {
  throw new Error("psql backend unimplemented");
}
