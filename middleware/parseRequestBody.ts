import AppError from "@/errors/AppError";
import { NextRequest } from "next/server";

export default async function parseRequestBody<T>(
  req: NextRequest,
): Promise<T> {
  const bodyText = await req.text();

  // console.log(bodyText);

  if (!bodyText) {
    throw new AppError({
      message: "Request body cannot be empty",
      httpStatusCode: 400,
      exposeToUser: true,
    });
  }

  try {
    const json = JSON.parse(bodyText);
    console.log(json);
    return json;
  } catch (e: unknown) {
    throw new AppError({
      message: `Invalid JSON in body: ${(e as Error).toString()}`,
      httpStatusCode: 400,
      exposeToUser: true,
    });
  }
}
