import React from 'react';
import api from '../api'; // Certifique-se de que o caminho da API está correto

// Componente para baixar o PDF
const DownloadPdfButton = ({ url, fileName }) => {
    
    // Função para baixar o PDF
    const downloadPdf = async () => {
        try {
            const response = await api.get(url, {
                responseType: 'blob' // A resposta será um arquivo binário (PDF)
            });
            
            // Criar um link temporário para o download do arquivo PDF
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', fileName); // Define o nome do arquivo
            document.body.appendChild(link);
            link.click(); // Simula o clique para baixar
            document.body.removeChild(link); // Remove o link após o clique
        } catch (error) {
            console.error('Erro ao baixar o PDF:', error);
        }
    };

    return (
        <button onClick={downloadPdf}>Imprimir</button>
    );
};

export default DownloadPdfButton;
