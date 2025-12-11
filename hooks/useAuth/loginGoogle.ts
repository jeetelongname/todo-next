import { Token } from "@/models/token";
import parseServerError from "@/utils/parseServerError";

export default async function loginGoogle(
  googleIdToken: string,
): Promise<Token> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method: "google_oauth",
      idToken: googleIdToken,
    }),
  });

  if (!res.ok) {
    // TODO identify / document what errors we might expect from login route
    const error = await parseServerError(res)
    console.error(error)

    throw error
  }

  const data = await res.json();
  return data.accessToken;
}