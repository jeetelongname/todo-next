import TodoRepo from "@/interfaces/TodoRepo/factory";

export default async function read_todo(id: string): Promise<Boolean> {
  try {
    return await TodoRepo.todo_delete(id);
  } catch (e) {
    throw e as Error;
  }
}
