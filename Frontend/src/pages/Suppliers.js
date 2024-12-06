import React, { useEffect, useState } from 'react';
import api from '../api';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        api.get('/suppliers')
            .then(response => setSuppliers(response.data))
            .catch(error => console.error('Erro ao buscar fornecedores:', error));
    }, []);

    return (
        <div>
            <h1>Fornecedores</h1>
            <ul>
                {suppliers.map(supplier => (
                    <li key={supplier.id}>{supplier.name} - {supplier.contact}</li>
                ))}
            </ul>
        </div>
    );
};

export default Suppliers; // Garantir que seja uma exportação padrão
