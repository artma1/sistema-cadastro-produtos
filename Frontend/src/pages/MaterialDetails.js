import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MaterialDetails = () => {
  const { id } = useParams(); // Captura o ID da URL
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7120/api/materials/${id}`)
      .then(response => setMaterial(response.data))
      .catch(() => setError('Erro ao buscar detalhes do material'));
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!material) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Detalhes do Material</h1>
      <p><strong>Nome:</strong> {material.name}</p>
      <p><strong>Código:</strong> {material.code}</p>
      <p><strong>Descrição:</strong> {material.description}</p>
      <p><strong>Código Fiscal:</strong> {material.fiscalCode}</p>
      <p><strong>Tipo:</strong> {material.specie}</p>
      <p><strong>Criado em:</strong> {new Date(material.createdAt).toLocaleString()}</p>
      <p><strong>Atualizado em:</strong> {material.updatedAt ? new Date(material.updatedAt).toLocaleString() : 'Não atualizado'}</p>
      <button onClick={() => navigate(`/materials/edit/${id}`)}>Editar</button>
      <button onClick={() => navigate('/materials')}>Voltar</button>
    </div>
  );
};

export default MaterialDetails;
