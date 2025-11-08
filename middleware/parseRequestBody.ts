import { NextRequest } from "next/server";

export default async function parseRequestBody<T>(
  req: NextRequest,
): Promise<T> {
  const bodyText = await req.text();

  // console.log(bodyText);

  if (!bodyText) {
    throw new Error("Request body cannot be empty");
  }

  try {
    const json = JSON.parse(bodyText);
    console.log(json);
    return json;
  } catch (e: unknown) {
    throw new Error(`Invalid JSON in body: ${(e as Error).toString()}`);
  }
}
