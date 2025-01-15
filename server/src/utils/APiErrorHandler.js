import StatusCode from "../constants/statusCodes.js";

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = "error";
        Error.captureStackTrace(this, this.constructor);
    }

    static notFound(message = "Not Found") {
        return new ApiError(StatusCode.NOT_FOUND, message);
    }

    static badRequest(message = "Bad Request") {
        return new ApiError(StatusCode.BAD_REQUEST, message);
    }

    static unauthorized(message = "Unauthorized Access") {
        return new ApiError(StatusCode.UNAUTHORIZED, message);
    }

    static conflict(message = "Conflict") {
        return new ApiError(StatusCode.CONFLICT, message);
    }

    static internal(message = "Internal Server Error") {
        return new ApiError(StatusCode.INTERNAL_SERVER, message);
    }
}

export default ApiError;
