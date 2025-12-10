import TodoRepo from "@/interfaces/TodoRepo/factory";
import { Todo } from "@/models/todo";

export default async function read_todos(): Promise<Array<Todo>> {
  try {
    return await TodoRepo.todo_read_all();
  } catch (e) {
    throw e as Error;
  }
}
