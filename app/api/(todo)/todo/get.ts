import TodoService from "@/service";
import { NextRequest, NextResponse } from "next/server";
import AppError from "@/errors/AppError";

export default async function GET(req: NextRequest) {
  try {
    const id: string | null = req.nextUrl.searchParams.get("id");
    let todo;

    if (id) {
      todo = await TodoService.read_todo(id);
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
        status: 200,
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
