import React from 'react';
import './App.css';
import TaskController from './controllers/taskController'; // Importing TaskController

function App() {
  return (
    <div className="App">
      <TaskController /> {/* Using TaskController to handle the app logic */}
    </div>
  );
}

export default App;
