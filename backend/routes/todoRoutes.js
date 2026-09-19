import express from 'express';
import Todo from '../models/todo.js';

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new todo
router.post("/", async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: error.message });
    }
});


// Update a todo 
router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Not found' });
        }

        if (req.body.title !== undefined) {
            todo.title = req.body.title;
        }

        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Todo deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;