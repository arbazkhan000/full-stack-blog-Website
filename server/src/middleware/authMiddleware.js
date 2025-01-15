import jwt from "jsonwebtoken";
import ApiError from "../utils/APiErrorHandler.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            (req.headers.authorization &&
                req.headers.authorization.split(" ")[1]);

        console.log("Token is middleware:", token);

        if (!token) {
            return ApiError.unauthorized("Access denied, token missing");
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // const user = await User.findById(decoded._id);

        // Attach user info to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error.message);
        if (error.name === "TokenExpiredError") {
            return next(ApiError.unauthorized("Token has expired"));
        } else if (error.name === "JsonWebTokenError") {
            return next(ApiError.unauthorized("Invalid token"));
        } else {
            return next(ApiError.internal("Authentication failed"));
        }
    }
};

export default authMiddleware;
