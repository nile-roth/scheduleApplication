import React, { useState } from 'react';
import axios from 'axios';

function TaskForm( {tasks, setTasks} ) {
    const initialState = {
        id: '',
        taskDate: '',
        taskTime: '',
        taskTitle: ''
    }

    const [task, setTask] = useState(initialState);

    const handleChange = event => {
        const { name, value } = event.target;
        setTask(prevTask => ({
            ...prevTask,
            id: Date.now(),
            [name]: value
        }))
    };

    const handleSubmit = event => { 
        event.preventDefault()
        setTasks([task, ...tasks])
        console.log(task)
        axios.post('http://localhost:9000/tasks', task)
        .then(res => {
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
        setTask(initialState)
    }
    return(
        <form onSubmit={handleSubmit}>
            
            <input
                type="text"
                required
                name="taskTitle"
                value={task.taskTitle}
                placeholder="Enter task"
                onChange={handleChange}
            />

            {/* Task Date */}
            <input
                type="date"
                required
                name="taskDate"
                value={task.taskDate}
                onChange={handleChange}
            />

            {/* Task Time */}
            <input
                type="time"
                required
                name="taskTime"
                value={task.taskTime}
                onChange={handleChange}
            />

            {/* Submit Button */}
            <button type="submit">Add Task</button>
        </form>
    )
};

export default TaskForm;
