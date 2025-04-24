import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/escola',
    timeout: 10000,
    headers: {
        "Content-Type": 'aplication/json',
    },
});

export default api;