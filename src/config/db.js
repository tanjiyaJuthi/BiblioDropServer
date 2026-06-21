import mongoose from "mongoose";

export const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.AUTH_DB_NAME,
        });

        console.log("Mongoose connected");
    } catch (err) {
        console.error("Mongoose connection error:", err);
        process.exit(1);
    }
};