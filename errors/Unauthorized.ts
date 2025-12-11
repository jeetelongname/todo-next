import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class Unauthorized extends AppError {
  constructor({
    name = 'Unauthorized',
    message = 'Auth not valid',
    httpStatusCode = 403,
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
