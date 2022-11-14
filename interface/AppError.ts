const getStatusMessage = (statusCode: number): string => {
    switch (statusCode) {
        case 401: return "Unauthorized";
        case 404: return "Not Found";
        case 422: return "Unprocessable Entity";
        default: return "Internal Server Error";
    }
}

export const createServerError = <T>(statusCode: number, message?: string, errorObject?: T) => {
    const statusMessage = getStatusMessage(statusCode);

    return createError({
        statusCode,
        statusMessage,
        data: {
            error: true,
            message: message || "Internal Server Error",
            errorDetails: errorObject
        }
    });
}