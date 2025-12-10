import { NextRequest, NextResponse } from "next/server";
import handleErrorResponse from "@/middleware/handleErrorResponse";
import requestLogger from "@/middleware/requestLogger";
import parseRequestBody from "@/middleware/bodyParser";
import InvalidRegistrationMethod from "@/errors/InvalidRegistrationMethod";
import AuthService from "@/service/auth";

interface MagicLinkRegisterBody {
  method: 'magic_link';
  email: string;
}

interface UsernamePasswordRegisterBody {
  method: 'username_pass';
  username: string;
  password: string;
  email: string;
}

interface GoogleOAuthRegisterBody {
  method: 'google_oauth';
  idToken: string;
}

export type RegisterRequestBody =
  | MagicLinkRegisterBody
  | UsernamePasswordRegisterBody
  | GoogleOAuthRegisterBody;

export default async function GET(req: NextRequest) {
  const reqId = requestLogger(req)

  try {
    const body = await parseRequestBody<RegisterRequestBody>(req, true)

    if (!body?.method) {
      throw new InvalidRegistrationMethod({
        message: 'Registration method missing'
      });
    }

    const method = body.method

    switch (method) {
      case 'magic_link':
        await AuthService.register_magic_link(body.email);
        break;

      case 'username_pass':
        await AuthService.register_username_password(
          body.email,
          body.password,
          body.username,
        );
        break;

      case 'google_oauth':
        await AuthService.register_google_oauth(body.idToken);
        break;

      default:
        throw new InvalidRegistrationMethod({
          message: `Invalid registration method ${method}`
        });
      }

    return NextResponse.json(
      {
        status: 201,
        headers: {
          "x-request-id": reqId,
        },
      },
    );
  } catch (error: unknown) {
    return handleErrorResponse(error, reqId)
  }
}
