import mongoose from "mongoose";
import { DB_URL } from "./config.js"

export const connect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
};