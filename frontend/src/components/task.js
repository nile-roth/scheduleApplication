import React from 'react';

function Task({task, handleDelete}) {
    console.log("Task data:", task); // Check task data
    return(
        <div class="task">
            <div class="taskHeader">
                <p>{task.taskDate}</p>
                <p>{task.taskTime}</p>
            </div>
            <p>{task.taskTitle}</p>
            <button onClick={() => handleDelete(task.id)}>X</button>
        </div>
    )
};

export default Task;