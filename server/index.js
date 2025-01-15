import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import StatusCode from "./src/constants/statusCodes.js";
import ConnectDb from "./src/db/Connect.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();
const app = express();

// Middleware

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
console.log("Client URL", process.env.FRONTEND_URL);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser());

// Routes
app.use("/api/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || StatusCode.INTERNAL_SERVER;
    res.status(statusCode).json({
        status: err.status || "error",
        message: err.message,
    });
});

app.get("/", (req, res) => {
    res.send("Welcome to the server");
});

// Start server
const startServer = async () => {
    try {
        await ConnectDb();
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
