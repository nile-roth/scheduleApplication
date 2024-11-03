import React from 'react';
import TaskForm from './components/taskForm';
import Task from './components/task';

const TaskView = ({ tasks, handleAddTask, handleDelete }) => {

    // Sort tasks by date and time
    const sortedTasks = tasks.slice().sort((a, b) => {
        const dateComparison = new Date(a.taskDate) - new Date(b.taskDate);
        
        if (dateComparison !== 0) {
            return dateComparison; 
        }
        
        // If dates are the same, sort by time
        return a.taskTime.localeCompare(b.taskTime);
    });

    // Convert 24-hour format to 12-hour format with AM/PM
    const convertTo12Hour = (time) => {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;  // Convert 0 to 12 for 12 AM
        return `${hours}:${minutes} ${ampm}`;
    };

    // Convert YYYY-MM-DD to a more readable format
    const convertDate = (date) => {
        let [year, month, day] = date.split('-');
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
        return `${months[parseInt(month) - 1]}, ${parseInt(day)} ${year}`;
    };

    return (
        <div>
            <TaskForm addTask={handleAddTask} />
            <div className="task-list">
                {sortedTasks.map(task => (
                    <Task
                        key={task.id}
                        task={{
                            ...task,
                            taskDate: convertDate(task.taskDate),  // Convert date before displaying
                            taskTime: convertTo12Hour(task.taskTime) // Convert time before displaying
                        }}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskView;
