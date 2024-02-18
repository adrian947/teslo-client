// axios.js
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: apiUrl,
  timeout: 5000, // Timeout de 5 segundos
});

// Interceptor para agregar el token a todas las solicitudes
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autorización (por ejemplo, token expirado)
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Puedes manejar la lógica de renovación de token o redirección aquí
      console.error('Token no válido o expirado. Realizar acciones necesarias.');
    }
    return Promise.reject(error);
  }
);

export default instance;
