import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    })
);

// Routes
app.use("/api/todos", todoRoutes);

// Local development
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, async () => {
        await connectDB();
        console.log(`Server started at http://localhost:${PORT}`);
    });
}

// Connect MongoDb
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// Vercel
export default app;