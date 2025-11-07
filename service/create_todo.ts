import { Todo, InsertTodo } from "@/models/todo";
import TodoRepo from "@/interfaces/TodoRepo/factory";

export default async function create_todo(todoI: InsertTodo): Promise<Todo> {
  try {
    const todo = await TodoRepo.todo_create(todoI);
    return todo;
  } catch (e) {
    throw e as Error;
  }
}
