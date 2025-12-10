import { useMutation } from "@tanstack/react-query";
import loginEmailPasswordFn from "./loginEmailPassword";
import registerEmailPasswordFn from "./registerEmailPassword";
import { UsernamePasswordRegisterBody } from "@/models/register";

export function useAuth() {
  const loginEmailPassword = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginEmailPasswordFn(email, password),
  });

  const registerEmailPassword = useMutation({
    mutationFn: (data: Omit<UsernamePasswordRegisterBody, "method">) =>
      registerEmailPasswordFn(data),
  });

  return { 
    loginEmailPassword,
    registerEmailPassword,
  };
}
