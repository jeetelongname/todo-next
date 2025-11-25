import InvalidRequestBodyError from "@/errors/InvalidRequestBody";
import { NextRequest } from "next/server";

export async function parseRequestBody<T>(
  req: NextRequest,
  allowEmpty: boolean = false,
): Promise<T | {}> {
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
