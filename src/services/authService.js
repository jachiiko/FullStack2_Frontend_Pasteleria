import api, { setToken } from "./api";

export const getRegions = async () => {
  const response = await api.get("/regions");
  return response.data;
};

export const register = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  const token = response.data?.token;
  if (token) {
    setToken(token);
  }
  return response.data;
};