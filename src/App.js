// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskSearch from './components/TaskSearch';
import './App.css';
import logo from './assets/logo.png';   

function App() {
  return (
    <Router>
      <div className="container">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="Logo" />
          <h1>APLICAÇÃO TO DO LIST</h1>
        </header>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
          <Route path="/search" element={<TaskSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
