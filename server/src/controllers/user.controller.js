import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.schema.js";
import ApiError from "../utils/APiErrorHandler.js";
import ApiResponse from "../utils/ApiResponseHandler.js";

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
};

const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw ApiError.notFound("All fields are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw ApiError.conflict("Email is already registered");
        }
        const hashPassword = await bcrypt.hash(password, 8);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
        });
        const token = generateToken({ id: newUser._id });
        console.log("Token is create user:", token);

        return ApiResponse.created(
            res,
            token,
            newUser,
            "User registered successfully"
        );
    } catch (error) {
        console.log(error.message);
        return ApiError.internal("Something went wrong");
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return ApiError.notFound("All fields are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return ApiError.notFound("Invalid email or password");
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return ApiError.notFound("Invalid email or password");
        }

        const token = generateToken({ id: user._id });
        console.log("Token:", token);

        res.cookie("token", token, { httpOnly: true });

        return ApiResponse.success(
            res,
            token,
            user,
            "User logged in successfully"
        );
    } catch (error) {
        console.error("Error during login:", error);
        return ApiError.internal("Something went wrong");
    }
};


const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        return ApiResponse.success(
            res,
            user,
            "User profile fetched successfully"
        );
    } catch (error) {
        console.log(error.message);
        return ApiError.internal("Somthing went wrong");
    }
};

export { userLogin, userProfile, userRegister };
