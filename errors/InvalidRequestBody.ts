import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class InvalidRequestBodyError extends AppError {
    constructor({
        message,
        httpStatusCode = null,
        exposeToUser = false,
        cause,
    }: AppErrorInterface) {
        super({
            message,
            httpStatusCode,
            exposeToUser,
            cause,
        });

        this.name = 'InvalidBodyError';
    }
}
