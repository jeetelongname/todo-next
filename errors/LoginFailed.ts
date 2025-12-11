import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class InvalidLoginMethod extends AppError {
    constructor({
        name = 'LoginFailed',
        message = 'LoginFailed',
        httpStatusCode = 400,
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
