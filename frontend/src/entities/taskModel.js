// TaskModel.js
import axios from 'axios';

class TaskModel {
    static async getTasks() {
        return axios.get('http://localhost:9000/tasks');
    }

    static async addTask(task) {
        return axios.post('http://localhost:9000/tasks', task);
    }

    static async deleteTask(id) {
        return axios.delete(`http://localhost:9000/tasks/${id}`);
    }
}

export default TaskModel;
