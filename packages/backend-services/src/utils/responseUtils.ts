import { Response } from "express";

export async function sendErrorResponse(
    res: Response,
    errorCode: number = 500,
    errorMessage?: string,
): Promise<void> {
    let statusMessage: string;
    switch (errorCode) {
        case 301:
            statusMessage = "Moved Pernamently";
            break;
        case 302:
            statusMessage = "Found";
            break;
        case 304:
            statusMessage = "Not Modified";
            break;
        case 400:
            statusMessage = "Bad Request";
            break;
        case 401:
            statusMessage = "Unauthorized";
            break;
        case 403:
            statusMessage = "Forbidden";
            break;
        case 404:
            statusMessage = "Not Found";
            break;
        case 409:
            statusMessage = "Conflict";
            break;
        case 502:
            statusMessage = "Bad Gateway";
            break;
        case 404:
            statusMessage = "Service unavailable";
            break;
        default: // 500
            statusMessage = "Internal Server Error";
    }

    const errMessage = `${statusMessage}` + ( errorMessage ? `: ${String(errorMessage)}` : '');

    res.statusMessage = errMessage;
    res.status(errorCode)
        .json({
            errorCode,
            message: errMessage,
        })
        .end();
}

export async function sendSuccessResponse(
    res: Response,
    statusCode: number = 200,
    data?: object,
): Promise<void> {
    res.status(statusCode).json(data);
}
