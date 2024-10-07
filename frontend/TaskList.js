//maps over tasks from server and renders on page
import React from "react";
import Task from './Task';

function TaskList({tasks, handleDelete}) {
    const sortedTasks = tasks.sort((a, b) => {
        const dateComparison = new Date(a.taskDate) - new Date(b.taskDate);
        
        if (dateComparison !== 0) {
            return dateComparison; 
        }
        
        // If dates are the same, sort by time
        return a.taskTime.localeCompare(b.taskTime);
    });

    return(
        <div>
            {sortedTasks.map(task => {
                return <Task key={task.id} task={task} handleDelete={handleDelete}/>
            })}
        </div>
    )
};

export default TaskList;
