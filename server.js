const express = require('express');
const helmet = require('helmet');

const path = require('path');
const db = require('./routes/dbConfig');
const server = express();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.use(helmet());
server.use(express.json());

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
    const { taskTitle, taskDate, taskTime } = req.body
    if (!taskTitle || !taskDate || !taskTime) {
        return res.status(400).json( {message: 'You must include a task in your request'})  
    }
    try {
        await db('tasks').insert( {taskTitle, taskDate, taskTime} )
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

// Serve static files from the React app
server.use(express.static(path.join(__dirname, 'build')));

//Handle other routes and send back the React app (for React Router)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = server;