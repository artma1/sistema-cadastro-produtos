import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7120/api/', // URL do seu back-end
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default api;
