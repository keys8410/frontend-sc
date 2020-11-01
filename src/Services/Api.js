import axios from 'axios';

const token = window.localStorage.getItem('token');

const api = axios.create({
  baseURL: 'http://localhost:3001/v1',
});

api.defaults.headers.authorization = `Bearer ${token}`;

export default api;
