import TodoService from "@/service";
import { NextRequest, NextResponse } from "next/server";

export default async function DELETE(req: NextRequest) {
  try {
    const id: string | null = req.nextUrl.searchParams.get("id");
    let result: Boolean;

    if (id) {
      result = await TodoService.delete_todo(id);
    } else {
      throw new Error("no id provided");
    }

    return NextResponse.json(
      {
        delete: result,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: (error as Error).toString(),
      },
      {
        // FIXME: should change depending on error above
        status: 500,
      },
    );
  }
}
