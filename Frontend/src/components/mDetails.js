import React from 'react';

const MDetails = ({ material, onBack }) => {
    return (
        <div>
            <h1>Detalhes do Material: {material.name}</h1>
            <p><strong>Código:</strong> {material.code}</p>
            <p><strong>Descrição:</strong> {material.description}</p>
            <p><strong>Código Fiscal:</strong> {material.fiscalCode}</p>
            <p><strong>Tipo:</strong> {material.specie}</p>
            <p><strong>Criado em:</strong> {new Date(material.createdAt).toLocaleString()}</p>
            <p><strong>Atualizado em:</strong> {material.updatedAt ? new Date(material.updatedAt).toLocaleString() : 'Não atualizado'}</p>
            <button onClick={onBack}>Voltar</button>
        </div>
    );
};

export default MDetails;
