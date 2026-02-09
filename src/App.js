import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Install Jenkins', completed: true },
    { id: 2, text: 'Automate Deployment', completed: false },
  ]);
  const [input, setInput] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!input) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pipeline Task Tracker</h1>
        <form onSubmit={addTask}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Next DevOps step..." 
          />
          <button type="submit">Add Task</button>
        </form>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {task.text}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;