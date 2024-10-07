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

    // Convert 24-hour format to 12-hour format with AM/PM
    const convertTo12Hour = (time) => {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;  // Convert 0 to 12 for 12 AM, and handle hours past 12
        return `${hours}:${minutes} ${ampm}`;
    };

    const handleSubmit = event => { 
        event.preventDefault()

        const updatedTask = {
            ...task,
            taskTime: convertTo12Hour(task.taskTime), // Convert taskTime to 12-hour format
        };

        setTasks([updatedTask, ...tasks]);
        console.log(updatedTask)
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
            <div class = "formInput">
                <input
                    type="text"
                    required
                    name="taskTitle"
                    value={task.taskTitle}
                    placeholder="Enter task"
                    onChange={handleChange}
                />

                <div class="secRow">
                    <div class="datetime">
                        
                        <input
                            type="date"
                            required
                            name="taskDate"
                            value={task.taskDate}
                            onChange={handleChange}
                        />

                        <input
                            type="time"
                            required
                            name="taskTime"
                            value={task.taskTime}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button type="submit">Add Task</button>
                </div>
            </div>  
        </form>
    )
};

export default TaskForm;
