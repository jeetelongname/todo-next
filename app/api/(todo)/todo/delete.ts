import AppError from "@/errors/AppError";
import handleErrorResponse from "@/middleware/handleErrorResponse";
import requestLogger from "@/middleware/requestLogger";
import TodoService from "@/service/todo";
import { NextRequest, NextResponse } from "next/server";

export default async function DELETE(req: NextRequest) {
  const reqId = requestLogger(req)

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
        headers: {
          "x-request-id": reqId,
        },
      },
    );
  } catch (error: AppError | unknown) {
    return handleErrorResponse(error, reqId)
  }
}
