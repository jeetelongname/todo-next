import AppErrorInterface from "@/interfaces/AppErrorInterface";

export default class AppError extends Error {
  public exposeToUser: boolean;
  public name: string;
  public httpStatusCode: number | null;
  public cause?: unknown;

  constructor({
    message,
    httpStatusCode = null,
    exposeToUser = false,
    name = 'AppError',
    cause,
  }: AppErrorInterface) {
    super(message);
    this.name = name;
    this.httpStatusCode = httpStatusCode;
    this.exposeToUser = exposeToUser;
    this.cause = cause;

    if (cause instanceof Error) {
      console.error("------------ ORIGINAL ERROR ------------");
      console.error(cause);
    }

    // Required for extending built-ins
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
