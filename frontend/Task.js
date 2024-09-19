import React from 'react';

function Task({task, handleDelete}) {
    return(
        <div class="task">
            {task.taskDate}
            <br></br>
            {task.taskTime}
            <br></br>
            {task.taskTitle}
            <button onClick={() => handleDelete(task.id)}>X</button>
        </div>
    )
};

export default Task;
