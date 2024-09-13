// src/components/TaskSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskSearch = () => {
  const [taskId, setTaskId] = useState('');
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/tasks/${taskId}`);
      setTask(response.data);
      setError(null);
    } catch (error) {
      setError('Tarefa não encontrada');
      setTask(null);
    }
  };

  return (
    <div className="task-container">
      <h2>Buscar Tarefa</h2>
      <input
        type="number"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        placeholder="Digite o ID da tarefa"
      />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p>{error}</p>}
      {task && (
        <div className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>ID: {task.id}</p>
        </div>
      )}
    </div>
  );
};

export default TaskSearch;
