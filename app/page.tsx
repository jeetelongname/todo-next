"use client";
import { useTodo } from "@/hooks/useTodo/useTodo";
import Loading from "@/components/Loading";
import { Typography } from "@mui/material";

export default function Home() {
  const { useGetTodoAll } = useTodo();

  const { data, isLoading, error } = useGetTodoAll();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Typography variant="body1">A skill issue has occured</Typography>;
  }

  if (!data) {
    return <Typography variant="body1">No data innit</Typography>;
  }

  return (
    <>
      <p>{JSON.stringify(data, null, 4)}</p>
    </>
  );
}
