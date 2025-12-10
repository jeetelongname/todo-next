import TokenExpired from "@/errors/TokenExpired";
import Unauthorized from "@/errors/Unauthorized";
import parseServerError from "@/utils/parseServerError";

export default async function refreshAccessToken() {
  const res = await fetch("/api/auth/refresh", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await parseServerError(res)
    console.error(error)

    if (error.name === 'TokenExpired') {
      throw new TokenExpired({
        ...error
      })
    } else if (error.name === 'Unauthorized') {
      throw new Unauthorized({ ...error })
    } else {
      throw new Error('Unexpected server error, failed to refresh token')
    }
  }

  const data = await res.json();
  return data.accessToken as string;
}
