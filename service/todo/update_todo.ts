import TodoRepo from "@/interfaces/TodoRepo/factory";
import { Todo } from "@/models/todo";

export default async function update_todo(id: string, updates: Partial<Todo>) {
  try {
    return await TodoRepo.todo_update(id, updates);
  } catch (e) {
    throw e as Error;
  }
}
