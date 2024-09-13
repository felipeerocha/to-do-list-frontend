// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', status: '' });
  const [isSuccess, setIsSuccess] = useState(false); // Novo estado para controlar a mensagem de sucesso
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`/api/tasks/${id}`)
        .then((response) => response.json())
        .then((data) => setTask(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/tasks/${id}` : '/api/tasks';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then(() => {
        setIsSuccess(true); // Atualiza o estado para mostrar a mensagem de sucesso
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (isSuccess) {
    return (
      <div className="container">
        <div className="success-message">
          <p>Tarefa concluída com sucesso!</p>
          <button
            className="button-link"
            onClick={() => navigate('/')}
          >
            Consultar Minhas Tarefas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={task.status}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um status</option>
          <option value="não iniciado">Não Iniciado</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluído">Concluído</option>
        </select>

        <button type="submit">Salvar</button>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/')}
        >
          Voltar
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
