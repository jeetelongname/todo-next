import parseRequestBody from "@/middleware/parseRequestBody";
import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/models/todo";
import TodoService from "@/service";
import AppError from "@/errors/AppError";

export default async function PATCH(req: NextRequest) {
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
      },
    );
  } catch (error: AppError | unknown) {
    return NextResponse.json(
      {
        error: (error as AppError).message,
      },
      {
        status: (error as AppError).httpStatusCode ?? 500,
      },
    );
  }
}
