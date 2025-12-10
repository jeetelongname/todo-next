import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import loginEmailPasswordFn from "./loginEmailPassword";
import registerEmailPasswordFn from "./registerEmailPassword";
import { UsernamePasswordRegisterBody } from "@/models/register";
import refreshAccessTokenFn from "./refreshAccessToken";

export function useAuth() {
  const queryClient = useQueryClient();

  const loginEmailPassword = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginEmailPasswordFn(email, password),
    onSuccess: (accessToken) => {
      queryClient.setQueryData(['auth', 'accessToken'], accessToken)
      getAccessToken.refetch()
    }
  });

  const registerEmailPassword = useMutation({
    mutationFn: (data: Omit<UsernamePasswordRegisterBody, "method">) =>
      registerEmailPasswordFn(data),
  });

  const getAccessToken = useQuery({
    queryKey: ['auth', 'accessToken'],
    queryFn: async () => {
      const newToken = await refreshAccessTokenFn()
      return newToken
    },
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
    retry: false,
  })

  return { 
    getAccessToken,
    loginEmailPassword,
    registerEmailPassword,
  };
}
