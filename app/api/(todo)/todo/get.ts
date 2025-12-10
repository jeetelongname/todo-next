import TodoService from "@/service/todo";
import { NextRequest, NextResponse } from "next/server";
import AppError from "@/errors/AppError";
import handleErrorResponse from "@/middleware/handleErrorResponse";
import requestLogger from "@/middleware/requestLogger";

export default async function GET(req: NextRequest) {
  const reqId = requestLogger(req)

  try {
    const id: string | null = req.nextUrl.searchParams.get("id");
    let todo;

    if (id) {
      todo = await TodoService.read_todo(id);
    } else {
      throw new AppError({
        message: "No ID provided",
        httpStatusCode: 400,
        exposeToUser: true,
      });
    }

    return NextResponse.json(
      {
        ...todo,
      },
      {
        status: 200,
        headers: {
          "x-request-id": reqId,
        },
      },
    );
  } catch (error: AppError | unknown) {
    return handleErrorResponse(error, reqId)
  }
}
