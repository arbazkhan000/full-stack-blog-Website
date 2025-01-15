import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
            required: true,
        },
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
        },
        avatar: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("Useer", userSchema);
export default User;
