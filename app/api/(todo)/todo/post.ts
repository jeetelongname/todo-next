import { NextRequest, NextResponse } from "next/server";
import { InsertTodo } from "@/models/todo";
import TodoService from "@/service";
import parseRequestBody from "@/middleware/parseRequestBody";
import AppError from "@/errors/AppError";

export default async function POST(req: NextRequest) {
  try {
    const body = await parseRequestBody<InsertTodo>(req);

    const newTodoData: InsertTodo = {
      title: body.title,
      tags: body?.tags ? body.tags : [],
      deadline: body.deadline,
      description: null,
    };

    newTodoData.description = body?.description ? body.description : null;

    const newTodo = await TodoService.create_todo(newTodoData);

    return NextResponse.json(
      {
        ...newTodo,
      },
      {
        status: 201,
        // headers: {
        //   "x-request-id": reqId,
        // },
      },
    );
  } catch (error: AppError | unknown) {
    return NextResponse.json(
      {
        error: (error as AppError).message,
      },
      {
        status: (error as AppError).httpStatusCode,
      },
    );
  }
}
