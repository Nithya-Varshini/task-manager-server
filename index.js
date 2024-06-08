const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let taskList = [];

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(taskList);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: uuidv4(),
        ...req.body
    };
    taskList.push(newTask);
    res.status(201).json(newTask);
});

// Edit an existing task
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = taskList.findIndex(task => task.id === id);
    if (index !== -1) {
        taskList[index] = { id, ...req.body };
        res.json(taskList[index]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = taskList.findIndex(task => task.id === id);
    if (index !== -1) {
        taskList.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
