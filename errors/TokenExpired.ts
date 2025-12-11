import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class TokenExpired extends AppError {
  constructor({
    name = 'TokenExpired',
    message = 'Token is expired',
    httpStatusCode = 401,
    exposeToUser = true,
    cause,
  }: AppErrorInterface) {
    super({
      name,
      message,
      httpStatusCode,
      exposeToUser,
      cause,
    });
  }
}
