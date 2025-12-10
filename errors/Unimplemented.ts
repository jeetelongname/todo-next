import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class Unimplemented extends AppError {
    constructor({
        name = 'Unimplemented',
        message = 'Route Unimplemented',
        httpStatusCode = 501,
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
