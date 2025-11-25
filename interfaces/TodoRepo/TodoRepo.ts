import { Todo, InsertTodo } from "@/models/todo";

export default interface TodoRepo {
  // Todo CRUD
  todo_create(todo: InsertTodo): Promise<Todo>;
  todo_read(id: string): Promise<Todo>;
  todo_update(id: string, updates: Partial<Todo>): Promise<Todo>;
  todo_delete(id: string): Promise<Boolean>;
}
