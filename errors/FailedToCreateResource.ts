import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class FailedToCreateResource extends AppError {
    constructor({
        name = 'FailedToCreateResource',
        message = 'FailedToCreateResource',
        httpStatusCode = 500,
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
