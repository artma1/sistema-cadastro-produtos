import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMaterial = () => {
  const { id } = useParams(); // Captura o ID da URL
  const [material, setMaterial] = useState({ 
    id: {id},
    idSupplier: 0,
    code: '', 
    name: '', 
    description: '', 
    fiscalCode: '', 
    specie: '', 
    createdAt: '',
    createdBy: '', 
    updatedAt: '', 
    updatedBy: '' 
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca o material para edição
    axios.get(`https://localhost:7120/api/materials/${id}`)
      .then(response => setMaterial(response.data))
      .catch(() => setError('Erro ao buscar material para edição'));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value });
  };

  const handleSubmit = () => {
    // Preenche os campos de data e usuário
    const updatedMaterial = {
      ...material,
      updatedAt: new Date().toISOString(), // Data de atualização
      updatedBy: 'user_name_or_email', // Substitua por um valor real, como o usuário logado
    };

    axios.put(`https://localhost:7120/api/materials/${id}`, updatedMaterial)
      .then(() => navigate(`/materials/${id}`)) // Redireciona para os detalhes
      .catch(() => setError('Erro ao salvar alterações'));
  };

  if (error) return <div>{error}</div>;
  if (!material.name) return <div>Carregando...</div>; // Garante que os dados chegaram antes de exibir o formulário

  return (
    <div>
      <h1>Editar Material</h1>
      <ul>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Nome:
            <input type="text" name="name" value={material.name} onChange={handleInputChange} style={{ display: 'block', width: '300px' }} />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Id do Fornecedor:
            <input type="text" name="idSuplier" value={material.idSupplier} onChange={handleInputChange} style={{ display: 'block', width: '300px' }} />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Descrição:
            <textarea name="description" value={material.description} onChange={handleInputChange} style={{ display: 'block', width: '300px' }} />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Código:
            <input type="text" name="code" value={material.code} onChange={handleInputChange} style={{ display: 'block', width: '300px' }} />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Código Fiscal:
            <input type="text" name="fiscalCode" value={material.fiscalCode} onChange={handleInputChange} style={{ display: 'block', width: '300px' }} />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Tipo:
            <input type="text" name="specie" value={material.specie} onChange={handleInputChange} style={{ display: 'block', width: '300px' }} />
          </label>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <label>
            Alterado por:
            <input type="text" name="updatedBy" value={material.updatedBy} onChange={handleInputChange} style={{ display: 'block', width: '300px' }} />
          </label>
        </li>
      </ul>
      <button onClick={handleSubmit}>Salvar</button>
      <button onClick={() => navigate(`/materials/${id}`)}>Cancelar</button>
    </div>
  );
};

export default EditMaterial;
