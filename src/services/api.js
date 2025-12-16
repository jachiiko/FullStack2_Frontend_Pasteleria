import axios from "axios";

export const TOKEN_KEY = "auth_token";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;