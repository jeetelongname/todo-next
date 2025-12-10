import AppError from "@/errors/AppError";
import TodoService from "@/service";
import { NextRequest, NextResponse } from "next/server";

export default async function DELETE(req: NextRequest) {
  try {
    const id: string | null = req.nextUrl.searchParams.get("id");
    let result: boolean;

    if (id) {
      result = await TodoService.delete_todo(id);
    } else {
      throw new AppError({
        message: "no id provided",
        httpStatusCode: 400,
        exposeToUser: true,
      });
    }

    return NextResponse.json(
      {
        delete: result,
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
        status: (error as AppError).httpStatusCode ?? 500,
      },
    );
  }
}
