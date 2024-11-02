import React, { useState } from 'react';

function TaskForm({ addTask }) {
    const initialState = {
        taskTitle: '',
        taskDate: '',
        taskTime: ''
    };

    const [task, setTask] = useState(initialState);

    const handleChange = event => {
        const { name, value } = event.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = event => { 
        event.preventDefault();
        const taskWithId = { ...task, id: Date.now() }; // Ensure a unique id is added here
        addTask(taskWithId); // Call addTask from TaskController
        setTask(initialState); // Reset the form fields
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="formInput">
                <input
                    type="text"
                    required
                    name="taskTitle"
                    value={task.taskTitle}
                    placeholder="Enter task"
                    onChange={handleChange}
                />
                <div className="secRow">
                    <div className="datetime">
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
    );
}

export default TaskForm;
