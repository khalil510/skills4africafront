// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://skills4africa.onrender.com/api/', // Your Django API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;