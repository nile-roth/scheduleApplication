import React from 'react';

function Task({task, handleDelete}) {
    return(
        <div>
            {task.taskTitle}
            <button onClick={() => handleDelete(task.id)}>X</button>
        </div>
    )
};

export default Task;