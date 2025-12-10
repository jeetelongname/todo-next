import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack direction="column" alignContent="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
}
