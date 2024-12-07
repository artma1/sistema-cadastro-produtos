import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SupplierCreate = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    adress: '',
    cnpj: '',
    cep: '',
    createdAt: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = () => {
    const newSupplier = {
      ...supplier,
      createdAt: new Date().toISOString(), // Define a data atual para o campo createdAt
    };

    axios
      .post('https://localhost:7120/api/suppliers', newSupplier)
      .then(() => navigate('/suppliers'))
      .catch(() => setError('Erro ao criar fornecedor'));
  };

  return (
    <div>
      <h1>Criar Fornecedor</h1>
      {error && <div>{error}</div>}
      <ul>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={supplier.name}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Endereço:
            <input
              type="text"
              name="adress"
              value={supplier.adress}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            CNPJ:
            <input
              type="text"
              name="cnpj"
              value={supplier.cnpj}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            CEP:
            <input
              type="text"
              name="cep"
              value={supplier.cep}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
      </ul>
      <button onClick={handleSubmit}>Salvar</button>
      <button onClick={() => navigate('/suppliers')}>Cancelar</button>
    </div>
  );
};

export default SupplierCreate;
