// src/TaskDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Erro ao buscar a tarefa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!task) {
    return <p>Tarefa não encontrada</p>;
  }

  return (
    <div className="container">
      <div className="task-container">
        <h2>Detalhes da Tarefa</h2>
        <p><strong>ID:</strong> {task.id}</p>
        <p><strong>Título:</strong> {task.title}</p>
        <p><strong>Descrição:</strong> {task.description}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <Link to="/" className="button-link">Voltar à Lista</Link>
      </div>
    </div>
  );
};

export default TaskDetails;
