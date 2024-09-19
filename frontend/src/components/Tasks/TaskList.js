//maps over tasks from server and renders on page
import React from "react";
import Task from './Task';

function TaskList({tasks, handleDelete}) {
    return(
        <div>
            {tasks.map(task => {
                return <Task key={task.id} task={task} handleDelete={handleDelete}/>
            })}
        </div>
    )
};

export default TaskList;