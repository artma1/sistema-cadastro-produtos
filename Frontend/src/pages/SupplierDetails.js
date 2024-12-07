import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SupplierDetails = () => {
  const { id } = useParams(); // Captura o ID da URL
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null); // Armazena os detalhes do fornecedor
  const [error, setError] = useState(null); // Armazena erros

  // Carregar os detalhes do fornecedor ao montar o componente
  useEffect(() => {
    axios
      .get(`https://localhost:7120/api/suppliers/${id}`) // Endpoint para obter os detalhes
      .then((response) => setSupplier(response.data))
      .catch(() => setError('Erro ao carregar detalhes do fornecedor'));
  }, [id]);

  // Renderizar a página
  return (
    <div>
      <h1>Detalhes do Fornecedor</h1>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {supplier ? (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
          <p><strong>Nome:</strong> {supplier.name}</p>
          <p><strong>Endereço:</strong> {supplier.adress}</p>
          <p><strong>CNPJ:</strong> {supplier.cnpj}</p>
          <p><strong>CEP:</strong> {supplier.cep}</p>
          <p><strong>Criado em:</strong> {new Date(supplier.createdAt).toLocaleDateString()}</p>

          <div style={{ marginTop: '20px' }}>
            <button onClick={() => navigate(`/suppliers/edit/${id}`)} style={{ marginRight: '10px' }}>
              Editar
            </button>
            <button onClick={() => navigate('/suppliers')}>Voltar</button>
          </div>
        </div>
      ) : (
        !error && <p>Carregando...</p> // Exibe "Carregando" enquanto os dados estão sendo buscados
      )}
    </div>
  );
};

export default SupplierDetails;
