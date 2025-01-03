// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="home-container">
      <div className="welcome-text">
        <h2>Bem-vindo ao Sistema Vega!</h2>
        <p>Escolha uma opção abaixo para começar:</p>
      </div>

      <div className="card-container">
        <div className="card" onClick={() => handleNavigation('/materials')}>
          <h3>Produtos</h3>
          <p>Gerencie os produtos de sua empresa</p>
        </div>
        <div className="card" onClick={() => handleNavigation('/suppliers')}>
          <h3>Fornecedores</h3>
          <p>Gerencie os fornecedores de sua empresa</p>
        </div>
      </div>
    </div>
  );
}

export default Home;