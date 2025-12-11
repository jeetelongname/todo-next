import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class ResourceNotFound extends AppError {
    constructor({
        name = 'ResourceNotFound',
        message = 'ResourceNotFound',
        httpStatusCode = 404,
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
