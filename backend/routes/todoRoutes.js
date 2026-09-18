import express from 'express';
import Todo from '../models/todo.js';

const router = express.Router();

// Get all todos
router.get('/', async (res, req) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: err.message }); 
    }
})

// Create a todo
router.post('/', async (res, req) => {
    const todo = new Todo({
        text: req.body.text,
    });

    try {
        const newTodo = await todo.save();
        res.status(200).json(newTodo);
    } catch (error) {
        res.json(500).json({message: error.message});
    }
})

// Update a todo 
router.put('/:id', async (res, req) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) res.status(404).json({message: 'Not found'});
        
        if (req.body.title !== undefined) {
            todo.title = req.body.title;
        }

        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }

        const updatedTodo = await Todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

// Delete a todo
router.delete('/:id', async (res, req) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Todo deleted'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;