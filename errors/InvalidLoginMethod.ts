import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class InvalidLoginMethod extends AppError {
    constructor({
        name = 'InvalidLoginMethod',
        message = 'InvalidLoginMethod',
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
