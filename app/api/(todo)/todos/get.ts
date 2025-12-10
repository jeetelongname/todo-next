import handleErrorResponse from "@/middleware/handleErrorResponse";
import requestLogger from "@/middleware/requestLogger";
import TodoService from "@/service";
import { NextRequest, NextResponse } from "next/server";

// req will be required when query parameters provided
export default async function GET(req: NextRequest) {
  const reqId = requestLogger(req)

  try {
    const todos = await TodoService.read_todos();

    return NextResponse.json(todos, {
      status: 200,
      headers: {
        "x-request-id": reqId,
      },
    });
  } catch (error: unknown) {
    return handleErrorResponse(error, reqId)
  }
}
