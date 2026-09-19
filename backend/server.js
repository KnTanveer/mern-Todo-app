import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    })
);

export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
};

// Connect to MongoDB BEFORE routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("MongoDB connection error:", error);
        res.status(500).json({
            message: "Database connection failed",
        });
    }
});

app.use("/api/todos", todoRoutes);

// Local development only
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}

export default app;