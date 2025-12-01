import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // cambia cuando deployes en AWS
});

// Insertar token en cada request automáticamente
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");  // O localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;