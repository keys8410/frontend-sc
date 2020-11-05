import axios from 'axios';

const api = axios.create({
  baseUrl: 'http://localhost:3001/v1',
});

api.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem('tkn');

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
