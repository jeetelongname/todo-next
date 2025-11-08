import { NextRequest, NextResponse } from "next/server";
import { InsertTodo } from "@/models/todo";
import TodoService from "@/service";
import parseRequestBody from "@/middleware/parseRequestBody";

export default async function POST(req: NextRequest) {
  try {
    // await getAuth(req);
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
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).toString() },
      {
        status: 500,
        // headers: {
        //   "x-request-id": reqId,
        // },
      },
    );
    // return handleErrorResponse(error, req, reqId);
  }
}
