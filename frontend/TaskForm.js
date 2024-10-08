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
        event.preventDefault();
    
        // Send the original task (no conversion)
        axios.post('http://localhost:9000/tasks', task)
        .then(res => {
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
        });
    
        setTasks([task, ...tasks]);
        setTask(initialState);
    };

    
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
