import { Todo, InsertTodo } from "@/models/todo";
import TodoRepo from "@/interfaces/TodoRepo/factory";

export default async function create_todo(todoI: InsertTodo): Promise<Todo> {
  try {
    return await TodoRepo.todo_create(todoI);
  } catch (e) {
    throw e as Error;
  }
}
