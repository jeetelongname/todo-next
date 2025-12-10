export default interface AppErrorInterface {
    message?: string,
    httpStatusCode?: number | null,
    exposeToUser?: boolean,
    name?: string,
    cause?: unknown
}