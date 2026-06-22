import axios from "axios";
import api from "../api";

console.log("AUTH API =", api.defaults.baseURL)

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const signup = (data) => {
  return authApi.post("/accounts/signup/", data);
};

export const login = (data) => {
  return authApi.post("/accounts/login/", data);
};