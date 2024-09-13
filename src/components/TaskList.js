// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="task-container">
      <h2>Lista de Tarefas</h2>
      <Link to="/create" className="button-link">Nova Tarefa</Link>
      <Link to="/search" className="button-link">Buscar Tarefa</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>ID: {task.id}</p>
            <Link to={`/edit/${task.id}`} className="button-link">Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
