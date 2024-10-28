const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./dbConfig');
const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Welcome to the Task app Server!!!')
});

server.get('/tasks', async (req, res) => {
    //GET all tasks from table tasks
    try {
        const tasks = await db('tasks');
        res.json(tasks)
    } catch(err) {
        console.log(err)
    }
});

server.post('/tasks', async (req, res) => {
    // Destructure task properties from the request body
    const { taskTitle, taskDate, taskTime } = req.body;

    if (!taskTitle || !taskDate || !taskTime) {
        return res.status(400).json({ message: 'You must include a task in your request' });
    }

    try {
        // Insert the task and return the id of the new row
        const [id] = await db('tasks').insert({ taskTitle, taskDate, taskTime });

        // Fetch the newly created task by its id and return it
        const newTask = await db('tasks').where({ id }).first();
        res.status(201).json(newTask); // Send the created task object
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error storing task' });
    }
});

server.delete('/tasks/:id', async (req, res) => {
    //DELETE a task
    const{ id } = req.params
    try {
        await db('tasks').where({ id }).del()
        res.status(200).json({ message: 'Delete successful' })
    } catch(err) {
        console.log(err)
    }
});

module.exports = server;
