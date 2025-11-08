import TodoService from "@/service";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
  try {
    const id: string | null = req.nextUrl.searchParams.get("id");
    let todo;

    if (id) {
      todo = await TodoService.read_todo(id);
    } else {
      throw new Error("no id provided");
    }

    return NextResponse.json(
      {
        ...todo,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).toString() },
      {
        // FIXME: should change depending on error above
        status: 500,
      },
    );
  }
}
