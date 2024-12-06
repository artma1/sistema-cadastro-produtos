import React, { useState, useEffect } from 'react';
import api from '../api'; // Certifique-se de que o caminho está correto
import { useNavigate } from 'react-router-dom'; 

const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState({ name: '', description: '' });
    const [editMaterial, setEditMaterial] = useState(null); // Para editar um material
    const [materialDetails, setMaterialDetails] = useState(null); // Para armazenar os detalhes do material

    const navigate = useNavigate();

    // Função para pegar todos os materiais
    useEffect(() => {
        api.get('/materials')
            .then(response => setMaterials(response.data))
            .catch(error => console.error('Erro ao buscar materiais:', error));
    }, []);

    // Função para adicionar um novo material
    const addMaterial = () => {
        api.post('/materials', newMaterial)
            .then(response => {
                setMaterials([...materials, response.data]); // Adiciona o novo material na lista
                setNewMaterial({ name: '', description: '' }); // Limpa o formulário
            })
            .catch(error => console.error('Erro ao adicionar material:', error));
    };

    // Função para exibir detalhes do material
    const showMaterialDetails = (id) => {
        navigate(`/materials/${id}`); // Redireciona para a página de detalhes do material
    };

    // Função para editar um material
    const editMaterialHandler = (material) => {
        navigate(`/materials/edit/${material.id}`, { state: { isEdit: true } });
      };

    const saveEditMaterial = () => {
        api.put(`/materials/edit/${editMaterial.id}`, newMaterial)
            .then(response => {
                setMaterials(materials.map(m => m.id === editMaterial.id ? response.data : m));
                setNewMaterial({ name: '', description: '' });
                setEditMaterial(null);
            })
            .catch(error => console.error('Erro ao editar material:', error));
    };

    // Função para deletar um material
    const deleteMaterial = (id) => {
        api.delete(`/materials/${id}`)
            .then(() => {
                setMaterials(materials.filter(m => m.id !== id)); // Remove o material da lista
            })
            .catch(error => console.error('Erro ao deletar material:', error));
    };

    return (
        <div>
            <h1>Materiais</h1>

            {/* Formulário para adicionar ou editar material */}
            <div>
                <h2>{editMaterial ? 'Editar Material' : 'Adicionar Material'}</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                />
                <button onClick={editMaterial ? saveEditMaterial : addMaterial}>
                    {editMaterial ? 'Salvar Alterações' : 'Adicionar'}
                </button>
            </div>

            {/* Lista de materiais */}
            <ul>
                {materials.map((material) => (
                    <li key={material.id}>
                        <strong>{material.name}</strong>: {material.description}
                        <button onClick={() => showMaterialDetails(material.id)}>Detalhes</button>
                        <button onClick={() => editMaterialHandler(material)}>Editar</button>
                        <button onClick={() => deleteMaterial(material.id)}>Excluir</button>
                    </li>
                ))}
            </ul>

            {/* Detalhes do material selecionado */}
            {materialDetails && (
                <div>
                    <h2>Detalhes do Material</h2>
                    <p><strong>Nome:</strong> {materialDetails.name}</p>
                    <p><strong>Código:</strong> {materialDetails.code}</p>
                    <p><strong>Descrição:</strong> {materialDetails.description}</p>
                    <p><strong>Código Fiscal:</strong> {materialDetails.fiscalCode}</p>
                    <p><strong>Tipo:</strong> {materialDetails.specie}</p>
                    <p><strong>Criado em:</strong> {new Date(materialDetails.createdAt).toLocaleString()}</p>
                    <p><strong>Atualizado por:</strong> {materialDetails.updatedBy}</p>
                </div>
            )}
        </div>
    );
};

export default Materials;
