import parseServerError from "@/utils/parseServerError";

export default async function fetchTodoAll() {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // next time dont use query params
  const response = await fetch(`/api/todos`, headers);

  if (!response.ok) {
    throw parseServerError(response)
  }

  const body = await response.json();
  console.log(body);
  return body;
}
