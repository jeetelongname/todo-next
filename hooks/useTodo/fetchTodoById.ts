import AppError from "@/errors/AppError";
import { QueryClient } from "@tanstack/react-query";

export default async function fetchTodoByID(
  id: string,
  queryClient: QueryClient,
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // next time dont use query params
  const response = await fetch(`/api/todo?id=${id}`, headers);

  if (!response.ok) {
    // FIXME: better errors
    const body = await response.json();
    console.error(body);
    throw new Error(body);
  }

  queryClient.invalidateQueries({
    queryKey: ["todos"],
  });

  const body = await response.json();
  return body;
}
