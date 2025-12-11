import { NextRequest, NextResponse } from "next/server";
import handleErrorResponse from "@/middleware/handleErrorResponse";
import requestLogger from "@/middleware/requestLogger";
import parseRequestBody from "@/middleware/bodyParser";
import InvalidLoginMethod from "@/errors/InvalidLoginMethod";
import AuthService from "@/service/auth";
import { LoginRequestBody } from "@/models/login";

export default async function POST(req: NextRequest) {
  const reqId = requestLogger(req);

  try {
    const body = await parseRequestBody<LoginRequestBody>(req, true);

    if (!body?.method) {
      throw new InvalidLoginMethod({
        message: "Login method missing",
      });
    }

    const method = body.method;

    let refreshToken: string;
    let accessToken: string;

    switch (method) {
      case "username_pass":
        ({ 
          refreshToken, 
          accessToken,
        } = await AuthService.login_username_password(
          body.email,
          body.password
        ));
        break;

      case "google_oauth":
        ({ 
          refreshToken, 
          accessToken,
        } = await AuthService.login_google_oauth(
          body.idToken
        ));
        break;

      default:
        throw new InvalidLoginMethod({
          message: `Invalid login method ${method}`,
        });
    }

    // Set refresh token as secure, HttpOnly cookie
    const response = NextResponse.json(
      {
        status: 200,
        accessToken,
      },
      {
        headers: {
          "x-request-id": reqId,
        },
      }
    );

    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true, // only over HTTPS
      path: "/api/auth/refresh",
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: unknown) {
    return handleErrorResponse(error, reqId);
  }
}
