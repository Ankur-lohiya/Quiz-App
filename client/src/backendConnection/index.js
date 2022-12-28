import axios from 'axios';

const backendConnection = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,  
        'Content-Type': 'application/json',
    },
});

export default backendConnection;