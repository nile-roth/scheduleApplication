import React, {useState, useEffect} from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import axios from 'axios';

function Tasks() {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        console.log("enters main to get /tasks")
        axios.get('http://localhost:5000/tasks', {})
        .then(res => {
            console.log(res)
            setTaskList(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    const handleDelete = id => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
        .then( res => {
            console.log(res)
            const newTasks = taskList.filter( item => {
                return item.id !== id
            })
            setTaskList(newTasks)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return(
        <div>
            <TaskForm tasks={taskList} setTasks = {setTaskList}/>
            <TaskList tasks={taskList} handleDelete={handleDelete}/>
        </div>
    )
};

export default Tasks;