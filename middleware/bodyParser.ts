import InvalidRequestBodyError from "@/errors/InvalidRequestBody";
import { NextRequest } from "next/server";

// Record<string, never> behaves as you would expect type {} to
// https://www.totaltypescript.com/the-empty-object-type-in-typescript
export default async function parseRequestBody<T>(
  req: NextRequest,
  allowEmpty: boolean = false,
): Promise<T | Record<string, never>> {
  const bodyText = await req.text();

  if (!bodyText) {
    if (!allowEmpty) {
      throw new InvalidRequestBodyError({
        message: "Request body cannot be empty",
        httpStatusCode: 400,
        exposeToUser: true,
      });
    } else {
      return {};
    }
  }

  try {
    return JSON.parse(bodyText);
  } catch {
    throw new InvalidRequestBodyError({
      message: "Invalid JSON in body",
      httpStatusCode: 400,
      exposeToUser: true,
    });
  }
}
