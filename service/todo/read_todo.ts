import { Todo } from "@/models/todo";
import TodoRepo from "@/interfaces/TodoRepo/factory";

export default async function read_todo(id: string): Promise<Todo> {
  try {
    return await TodoRepo.todo_read(id);
  } catch (e) {
    throw e as Error;
  }
}
