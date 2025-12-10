import parseRequestBody from "@/middleware/parseRequestBody";
import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/models/todo";
import TodoService from "@/service";
import AppError from "@/errors/AppError";
import requestLogger from "@/middleware/requestLogger";
import handleErrorResponse from "@/middleware/handleErrorResponse";

export default async function PATCH(req: NextRequest) {
  const reqId = requestLogger(req)

  try {
    const body = await parseRequestBody<Partial<Todo>>(req);
    const id = req.nextUrl.searchParams.get("id");

    let todo: Todo;

    if (id) {
      todo = await TodoService.update_todo(id, body);
    } else {
      throw new AppError({
        message: "no id provided",
        httpStatusCode: 400,
        exposeToUser: true,
      });
    }

    return NextResponse.json(
      {
        ...todo,
      },
      {
        status: 201,
        headers: {
          "x-request-id": reqId,
        },
      },
    );
  } catch (error: unknown) {
    return handleErrorResponse(error, reqId)
  }
}
