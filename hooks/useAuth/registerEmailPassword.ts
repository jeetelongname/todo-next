import { UsernamePasswordRegisterBody } from "@/models/register";

export default async function registerEmailPassword({
  username,
  email,
  password,
}: Omit<UsernamePasswordRegisterBody, "method">): Promise<void> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method: "username_pass",
      username,
      email,
      password,
    }),
  });

  // TODO proper error handling probably including error boundary
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || "Registration failed");
  }

  return;
}
