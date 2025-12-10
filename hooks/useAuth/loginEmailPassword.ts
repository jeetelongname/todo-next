import { Token } from "@/models/token";

export default async function loginEmailPassword(
  email: string,
  password: string,
): Promise<Token> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method: "username_pass",
      email,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();
  return data.accessToken;
}