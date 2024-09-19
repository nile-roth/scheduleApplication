import React, { useState } from 'react';
import axios from 'axios';

function TaskForm( {tasks, setTasks} ) {
    const initialState = {
        id: '',
        taskTitle: ''
    }

    const [task, setTask] = useState(initialState);

    const handleChange = event => {
        setTask({
            id: Date.now(),
            taskTitle: event.target.value
        })
    }

    const handleSubmit = event => { 
        event.preventDefault()
        setTasks([task, ...tasks])
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
                name="task"
                value={task.taskTitle}
                placeholder="Enter task"
                onChange={handleChange}
            />
        </form>
    )
};

export default TaskForm;