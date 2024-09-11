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
    //POST a task
    const { taskTitle } = req.body
    if (!taskTitle) {
        return res.status(400).json( {message: 'You must include a task in your request'})  //chagne to taskTItle?
    }
    try {
        await db('tasks').insert( {taskTitle} )
        res.status(201).json({ message: 'Task succesfully Stored!'})
    } catch(err) {
        console.log(err)
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