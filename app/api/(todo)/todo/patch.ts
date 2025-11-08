import parseRequestBody from "@/middleware/parseRequestBody";
import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/models/todo";
import TodoService from "@/service";

export default async function PATCH(req: NextRequest) {
  try {
    const body = await parseRequestBody<Partial<Todo>>(req);
    const id = req.nextUrl.searchParams.get("id");

    console.log(body);

    let todo: Todo;

    if (id) {
      todo = await TodoService.update_todo(id, body);
    } else {
      throw new Error("no id provided");
    }

    return NextResponse.json(
      {
        ...todo,
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).toString() },
      { status: 500 },
    );
  }
}
