<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import axios from 'axios';

function Tasks() {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/tasks', {})
        .then(res => {
            console.log(res)
            setTaskList(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    const handleDelete = id => {
        axios.delete(`http://localhost:9000/tasks/${id}`)
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
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
>>>>>>> 90968e4f63620a6b9785816a7cdd689b5ef5dd5c
