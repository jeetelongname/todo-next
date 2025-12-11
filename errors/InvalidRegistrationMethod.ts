import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class InvalidRegistrationMethod extends AppError {
    constructor({
        name = 'InvalidRegistrationMethod',
        message = 'InvalidRegistrationMethod',
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
