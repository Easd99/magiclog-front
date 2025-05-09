import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:5000/api/v1',
    baseURL: 'https://magiclog-back-production.up.railway.app/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
