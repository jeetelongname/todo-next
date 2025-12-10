import AppErrorInterface from "@/interfaces/AppErrorInterface";
import AppError from "./AppError";

export default class UnsupportedQueryOperand extends AppError {
    constructor({
        name = 'UnsupportedQueryOperand',
        message = 'UnsupportedQueryOperand',
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
