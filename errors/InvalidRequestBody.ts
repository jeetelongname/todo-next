import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class InvalidRequestBodyError extends AppError {
    constructor({
        name = 'InvalidBodyError',
        message,
        httpStatusCode = null,
        exposeToUser = false,
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
