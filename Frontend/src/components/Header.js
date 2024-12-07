import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '15px',
  };

  return (
    <header style={headerStyle}>
      <h1>Sistema de cadastro de produtos</h1>
      <nav>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/materials" style={linkStyle}>
          Materials
        </Link>
        <Link to="/suppliers" style={linkStyle}>
          Suppliers
        </Link>
      </nav>
    </header>
  );
};

export default Header;
