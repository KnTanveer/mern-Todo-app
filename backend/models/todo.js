import mongoose, { model } from 'mongoose';

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Todo = new mongoose.model('Todo', todoSchema);

export default Todo; 