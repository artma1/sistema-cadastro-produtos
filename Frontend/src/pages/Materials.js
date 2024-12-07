import React, { useState, useEffect } from 'react';
import api from '../api'; // Certifique-se de que o caminho está correto
import { useNavigate } from 'react-router-dom';
import DownloadPdf from '../components/DownloadPdf';

const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState({ name: '', description: '' });
    const [editMaterial, setEditMaterial] = useState(null);
    const [filterText, setFilterText] = useState(''); // Filtro de nome
    const [filterDate, setFilterDate] = useState(''); // Filtro de data
    const [filteredMaterials, setFilteredMaterials] = useState([]); // Materiais filtrados
    const navigate = useNavigate();

    // Função para buscar todos os materiais
    const fetchMaterials = async () => {
        try {
            const response = await api.get('/materials');
            setMaterials(response.data);
            setFilteredMaterials(response.data); // Inicializa a lista filtrada com todos os materiais
        } catch (error) {
            console.error('Erro ao buscar materiais:', error);
        }
    };

    useEffect(() => {
        fetchMaterials(); // Chama o fetch ao carregar os componentes
    }, []);

    // Função para aplicar o filtro de nome e data
    const handleFilterChange = () => {
        const filtered = materials.filter(material => {
            const nameMatch = material.name && material.name.toLowerCase().includes(filterText.toLowerCase());
            const dateMatch = filterDate ? new Date(material.createdAt) >= new Date(filterDate) : true;

            return nameMatch && dateMatch; // Retorna verdadeiro se ambos os filtros (nome e data) forem correspondentes
        });

        setFilteredMaterials(filtered); // Atualiza a lista filtrada
    };

    const addMaterial = () => {
        navigate('/materials/create');
    };

    const showMaterialDetails = (id) => {
        navigate(`/materials/${id}`);
    };

    const editMaterialHandler = (material) => {
        navigate(`/materials/edit/${material.id}`, { state: { isEdit: true } });
    };

    const saveEditMaterial = () => {
        api.put(`/materials/edit/${editMaterial.id}`, newMaterial)
            .then(response => {
                setMaterials(materials.map(m => m.id === editMaterial.id ? response.data : m));
                setFilteredMaterials(materials.map(m => m.id === editMaterial.id ? response.data : m)); // Atualiza a lista filtrada
                setNewMaterial({ name: '', description: '' });
                setEditMaterial(null);
            })
            .catch(error => console.error('Erro ao editar material:', error));
    };

    const deleteMaterial = (id) => {
        api.delete(`/materials/${id}`)
            .then(() => {
                setMaterials(materials.filter(m => m.id !== id));
                setFilteredMaterials(filteredMaterials.filter(m => m.id !== id)); // Remove da lista filtrada
            })
            .catch(error => console.error('Erro ao deletar material:', error));
    };

    return (
        <div>
            <h1>Materiais</h1>

            {/* Formulário de Filtro */}
            <div>
                <input
                    type="text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Filtrar por nome"
                />
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    placeholder="Filtrar por data"
                />
                <button onClick={handleFilterChange}>Filtrar</button>
            </div>

            <div>
                <button onClick={addMaterial}>
                    Adicionar Produto
                </button>
            </div>

            {/* Exibição dos materiais filtrados */}
            <ul>
                {filteredMaterials.map((material) => (
                    <li key={material.id}>
                        <strong>{material.name}</strong>: - {material.adress} - Criado em: {new Date(material.createdAt).toLocaleDateString()}
                        <button onClick={() => showMaterialDetails(material.id)}>Detalhes</button>
                        <button onClick={() => editMaterialHandler(material)}>Editar</button>
                        <button onClick={() => deleteMaterial(material.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <div><DownloadPdf url="/materials/print" fileName="produtos.pdf" /></div>
        </div>
    );
};

export default Materials;
