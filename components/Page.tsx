import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <Stack width="100%" alignItems="center" justifyContent="center">
      <Stack
        direction={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        gap={3}
        width="100%"
        maxWidth="1280px"
        p={3}
      >
        {children}
      </Stack>
    </Stack>
  );
}
