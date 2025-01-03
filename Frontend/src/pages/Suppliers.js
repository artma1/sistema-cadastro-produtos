import React, { useState, useEffect } from 'react';
import api from '../api'; // Certifique-se de que o caminho está correto
import { useNavigate } from 'react-router-dom';
import DownloadPdf from '../components/DownloadPdf';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        name: '',
        adress: '',
        cnpj: '',
        cep: '',
        qrCode: ''
    });
    const [editSupplier, setEditSupplier] = useState(null); // Para editar um fornecedor
    const [filterText, setFilterText] = useState(''); // Estado para o texto de filtro de nome
    const [filterDate, setFilterDate] = useState(''); // Estado para o filtro de data
    const navigate = useNavigate();

    // Função para buscar todos os fornecedores
    useEffect(() => {
        api.get('/suppliers')
            .then(response => {
                setSuppliers(response.data);
                setFilteredSuppliers(response.data); // Inicializa a lista filtrada com todos os fornecedores
            })
            .catch(error => console.error('Erro ao buscar fornecedores:', error));
    }, []);

    // Função para aplicar o filtro de nome e data
    const handleFilterChange = () => {
        const filtered = suppliers.filter(supplier => {
            const nameMatch = supplier.name.toLowerCase().includes(filterText.toLowerCase());
            const dateMatch = filterDate ? new Date(supplier.createdAt) >= new Date(filterDate) : true;

            return nameMatch && dateMatch; // Retorna verdadeiro se ambos os filtros (nome e data) forem correspondentes
        });

        setFilteredSuppliers(filtered); // Atualiza a lista filtrada
    };

    const addSupplier = () => {
        navigate('/suppliers/create');
    };

    // Função para exibir detalhes do fornecedor
    const showSupplierDetails = (id) => {
        navigate(`/suppliers/${id}`); // Redireciona para a página de detalhes do fornecedor
    };

    // Função para iniciar edição de fornecedor
    const editSupplierHandler = (supplier) => {
        navigate(`/suppliers/edit/${supplier.id}`, { state: { isEdit: true } });
    };

    // Função para salvar alterações do fornecedor
    const saveEditSupplier = () => {
        api.put(`/suppliers/${editSupplier.id}`, newSupplier)
            .then(response => {
                setSuppliers(suppliers.map(s => s.id === editSupplier.id ? response.data : s));
                setFilteredSuppliers(suppliers.map(s => s.id === editSupplier.id ? response.data : s)); // Atualiza a lista filtrada
                setNewSupplier({ name: '', adress: '', cnpj: '', cep: '', qrCode: '' });
                setEditSupplier(null);
            })
            .catch(error => console.error('Erro ao editar fornecedor:', error));
    };

    // Função para deletar um fornecedor
    const deleteSupplier = (id) => {
        api.delete(`/suppliers/${id}`)
            .then(() => {
                setSuppliers(suppliers.filter(s => s.id !== id));
                setFilteredSuppliers(filteredSuppliers.filter(s => s.id !== id)); // Remove da lista filtrada
            })
            .catch(error => console.error('Erro ao deletar fornecedor:', error));
    };

    return (
        <div>
            <h1>Fornecedores</h1>

            {/* Filtro de nome */}
            <div>
                <input
                    type="text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Filtrar por nome"
                />

            {/* Filtro de data */}
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    placeholder="Filtrar por data"
                />
                <button onClick={handleFilterChange}>Filtrar</button>
            </div>

            {/* Botão para adicionar ou editar fornecedor */}
            <div>
                <button onClick={editSupplier ? saveEditSupplier : addSupplier}>
                    {editSupplier ? 'Salvar Alterações' : 'Adicionar Fornecedor'}
                </button>
            </div>

            {/* Lista de fornecedores filtrada */}
            <ul>
                {filteredSuppliers.map((supplier) => (
                    <li key={supplier.id}>
                        <strong>{supplier.name}</strong> - {supplier.adress} - Criado em: {new Date(supplier.createdAt).toLocaleDateString()}
                        <button onClick={() => showSupplierDetails(supplier.id)}>Detalhes</button>
                        <button onClick={() => editSupplierHandler(supplier)}>Editar</button>
                        <button onClick={() => deleteSupplier(supplier.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <div><DownloadPdf url="/suppliers/print" fileName="fornecedores.pdf" /></div>
        </div>
    );
};

export default Suppliers;
