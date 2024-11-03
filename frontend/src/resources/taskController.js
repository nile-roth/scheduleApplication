// TaskController.js
import React, { useState, useEffect } from 'react';
import TaskModel from './entities/taskModel';
import TaskView from './templates/taskView';

function TaskController() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        TaskModel.getTasks()
            .then(res => setTasks(res.data))
            .catch(err => console.error('Error fetching tasks:', err));
    }, []);

    const handleAddTask = (task) => {
        TaskModel.addTask(task)
            .then(res => setTasks([res.data, ...tasks]))
            .catch(err => console.error('Error adding task:', err));
    };

    const handleDelete = (id) => {
        TaskModel.deleteTask(id)
            .then(() => setTasks(tasks.filter(task => task.id !== id)))
            .catch(err => console.error('Error deleting task:', err));
    };

    return (
        <TaskView 
            tasks={tasks} 
            handleAddTask={handleAddTask} 
            handleDelete={handleDelete} 
        />
    );
}

export default TaskController;
