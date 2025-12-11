import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid'

export default function requestLogger(request: NextRequest): string {
    let requestId = request.headers.get('x-request-id');

    if (!requestId) {
        requestId = uuidv4();
        request.headers.append('x-request-id', requestId);
    }

    console.log(`
        Incoming Request:
        ${new Date().toISOString()}
        ${request.method}
        ${request.nextUrl.pathname}
        Request ID: ${requestId}
    `);

    return requestId
};