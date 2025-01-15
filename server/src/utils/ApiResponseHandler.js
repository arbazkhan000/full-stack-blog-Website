import StatusCode from "../constants/statusCodes.js";

class ApiResponse {
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;
        this.status = statusCode < 400 ? "success" : "error";
        this.message = message;
        this.data = data;
    }

    static success(res, token, user, message = "Success") {
        return res.status(StatusCode.SUCCESS).json({
            status: "success",
            message,
            token,
            user,
        });
    }

    static created(res, data, message = "Created Successfully") {
        return res.status(StatusCode.CREATED).json({
            status: "success",
            message,
            data,
        });
    }
}

export default ApiResponse;
