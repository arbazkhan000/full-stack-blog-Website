import mongoose from "mongoose";

const ConnectDb = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL);
        console.log("Database is Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default ConnectDb;
