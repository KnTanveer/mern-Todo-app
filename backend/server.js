import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const app = express();

app.listen(5005, () => {
    connectMongo();
    console.log("server running on localhost:5005");
});

app.use(express.json());

app.use('/api/todo', todoRoutes);

const connectMongo = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI);
            console.log("Mongo db connected");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }