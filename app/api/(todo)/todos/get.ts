import AppError from "@/errors/AppError";
import TodoService from "@/service";
import { /* NextRequest ,*/ NextResponse } from "next/server";

// req will be required when query parameters provided
export default async function GET(/* req: NextRequest */) {
  try {
    const todos = await TodoService.read_todos();

    return NextResponse.json(todos, {
      status: 200,
    });
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
