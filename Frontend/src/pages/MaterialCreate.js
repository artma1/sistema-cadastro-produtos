import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MaterialsCreate = () => {
  const [material, setMaterial] = useState({
    idSupplier: '',
    code: '',
    name: '',
    description: '',
    fiscalCode: '',
    specie: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  });
  const [suppliers, setSuppliers] = useState([]); // Lista de fornecedores
  const [qrCode, setQrCode] = useState(''); // Sequência de caracteres do QR Code
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Carregar lista de fornecedores ao montar o componente
  useEffect(() => {
    axios
      .get('https://localhost:7120/api/suppliers') // Endpoint para obter fornecedores
      .then((response) => setSuppliers(response.data))
      .catch(() => setError('Erro ao carregar fornecedores'));
  }, []);

  // Atualizar QR Code ao selecionar um fornecedor
  useEffect(() => {
    if (material.idSupplier) {
      axios
        .get(`https://localhost:7120/api/materials/QRCode/${material.idSupplier}`)
        .then((response) => setQrCode(response.data)) // O backend retorna o QR Code como string
        .catch(() => setQrCode('Erro ao carregar QR Code')); // Exibe mensagem de erro se falhar
    }
  }, [material.idSupplier]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value });
  };

  const handleSubmit = () => {
    const newMaterial = {
      ...material,
      createdAt: new Date().toISOString(),
      createdBy: 'user_name_or_email',
      updatedAt: material.updatedAt || null, // Converte string vazia para null
    updatedBy: material.updatedBy || null,
    };

    axios
      .post('https://localhost:7120/api/materials', newMaterial)
      .then(() => navigate('/materials'))
      .catch(() => setError('Erro ao criar material'));
  };

  return (
    <div>
      <h1>Criar Material</h1>
      {error && <div>{error}</div>}
      <ul>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={material.name}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Fornecedor:
            <select
              name="idSupplier"
              value={material.idSupplier}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            >
              <option value="">Selecione um fornecedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>
        </li>
        {qrCode && (
          <li style={{ marginBottom: '10px' }}>
            <label>
              QR Code:
              <div
                style={{
                  marginTop: '5px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  display: 'inline-block',
                  width: '300px',
                  wordBreak: 'break-word',
                }}
              >
                {qrCode}
              </div>
            </label>
          </li>
        )}
        <li style={{ marginBottom: '10px' }}>
          <label>
            Descrição:
            <textarea
              name="description"
              value={material.description}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Código:
            <input
              type="text"
              name="code"
              value={material.code}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Código Fiscal:
            <input
              type="text"
              name="fiscalCode"
              value={material.fiscalCode}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Tipo:
            <input
              type="text"
              name="specie"
              value={material.specie}
              onChange={handleInputChange}
              style={{ display: 'block', width: '300px' }}
            />
          </label>
        </li>
      </ul>
      <button onClick={handleSubmit}>Salvar</button>
      <button onClick={() => navigate('/materials')}>Cancelar</button>
    </div>
  );
};

export default MaterialsCreate;
