import express from "express";
import {
    userLogin,
    userProfile,
    userRegister,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.route("/create").post(userRegister);
userRoutes.route("/login").post( authMiddleware,userLogin);
userRoutes.route("/profile").get(userProfile);

export default userRoutes;
