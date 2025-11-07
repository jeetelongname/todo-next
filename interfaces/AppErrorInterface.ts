export default interface AppErrorInterface {
    message: string,
    httpStatusCode: number | null,
    exposeToUser: boolean,
    cause?: unknown
}