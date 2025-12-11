"use client";
import { useEffect } from "react";
import { Card, Stack } from "@mui/material";
import { useAuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import LoginSection from "./components/loginSection";
import RegisterSection from "./components/registerSection";
import GoogleLoginSection from "./components/googleLoginSection";

export default function AuthPage() {
  const router = useRouter();
  const { getAccessToken } = useAuthContext();

  useEffect(() => {
    if (getAccessToken.data) {
      // Todo add toast provider to show this more conveniently
      console.log('user logged in')
      // navigate to default page when logged in
      // router.push("/user/todos");
    }
  }, [getAccessToken.data, router]);

  return (
    <>
      <Stack width="100%" alignItems="center" justifyContent="center">
        <Card>
          <LoginSection />
        </Card>

        <Card>
          <GoogleLoginSection />
        </Card>

        <Card>
          <RegisterSection />
        </Card>
      </Stack>
    </>
  );
}
