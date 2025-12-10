import { Todo } from "@/models/todo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchTodoByID from "./fetchTodoById";
import fetchTodoAll from "./fetchTodoAll";

export function useTodo() {
  const queryClient = useQueryClient();

  const useGetTodo = (id: string) => {
    return useQuery<Todo>({
      queryKey: [id],
      queryFn: () => {
        return fetchTodoByID(id, queryClient);
      },
      enabled: true,
      staleTime: 0,
      refetchOnWindowFocus: true,
    });
  };

  const useGetTodoAll = () => {
    return useQuery<Array<Todo>>({
      queryKey: ["todos"],
      queryFn: () => {
        return fetchTodoAll();
      },
      enabled: true,
      staleTime: 0,
      refetchOnWindowFocus: true,
    });
  };

  return { useGetTodo, useGetTodoAll };
}
