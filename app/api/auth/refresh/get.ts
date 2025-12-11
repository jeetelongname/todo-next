import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/service/auth";
import handleErrorResponse from "@/middleware/handleErrorResponse";
import Unauthorized from "@/errors/Unauthorized";
import requestLogger from "@/middleware/requestLogger";

export default async function GET(req: NextRequest) {
  const reqId = requestLogger(req)

  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      throw new Unauthorized({
        message: 'No refresh token provided'
      })
    }

    const { 
      accessToken,
    } = await AuthService.refresh_access_token(refreshToken);

    return NextResponse.json({ accessToken });
  } catch (err) {
    return handleErrorResponse(err, "refresh");
  }
}
