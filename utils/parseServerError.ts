import AppError from "@/errors/AppError";

export default async function parseServerError(res: Response): Promise<AppError> {
    try {
        const body = await res.json()

        const errorData: AppError = {
            name: body.name,
            message: body.message,
            httpStatusCode: res.status,
            exposeToUser: body.exposeToUser,
        };

        if (body?.cause) {
            errorData.cause = body.cause
        }

        return new AppError({...errorData})
    } catch (e) {
        console.error('error while parsing server error')
        console.error(e)

        return new AppError({
            name: 'Unable to parse server error',
            message: "Unknown error",
            httpStatusCode: 500,
            exposeToUser: true,
        });
    } 
}