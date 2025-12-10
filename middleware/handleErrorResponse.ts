import AppError from '@/errors/AppError';
import { NextResponse } from 'next/server';

function httpFormatCause(cause: unknown): string | null {
    if (typeof cause === 'string') return cause;
    if (cause instanceof Error) return cause.message;

    try {
        return JSON.stringify(cause);
    } catch {
        return null;
    }
}

export default function handleErrorResponse(
    error: unknown, 
    reqId: string,
): NextResponse {
    console.error('Handling error response:', error);

    if (
        error instanceof AppError && 
        (error as AppError).exposeToUser
    ) {
        const appError = error as AppError
        const responseBody: AppError = {
            ...appError
        };

        if (appError.cause) {
            const formattedCause = httpFormatCause(appError.cause);

            if (formattedCause != null) {
                responseBody.cause = formattedCause;
            }
        }

        return NextResponse.json(responseBody, {
            status: appError.httpStatusCode ?? 500,
            headers: { 'x-request-id': reqId },
        });
    }

    return NextResponse.json(
        {
            name: 'InternalServerError',
            message: 'An unexpected error occurred',
        },
        {
            status: 500,
            headers: { 'x-request-id': reqId },
        },
    );
}
