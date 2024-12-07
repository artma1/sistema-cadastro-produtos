import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SupplierEdit = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    adress: '',
    cnpj: '',
    cep: '',
    createdAt: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID do fornecedor pela URL

  // Carregar os dados do fornecedor ao montar o componente
  useEffect(() => {
    axios
      .get(`https://localhost:7120/api/suppliers/${id}`)
      .then((response) => setSupplier(response.data))
      .catch(() => setError('Erro ao carregar os dados do fornecedor'));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = () => {
    const updatedSupplier = {
      ...supplier,
      createdAt: supplier.createdAt || new Date().toISOString(), // Define `createdAt` se não existir
    };

    axios
      .put(`https://localhost:7120/api/suppliers/${id}`, updatedSupplier)
      .then(() => navigate('/suppliers'))
      .catch(() => setError('Erro ao atualizar o fornecedor'));
  };

  return (
    <div>
      <h1>Editar Fornecedor</h1>
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

export default SupplierEdit;
