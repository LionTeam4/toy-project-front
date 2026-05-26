import api from "../api";

console.log("AUTH API =", api.defaults.baseURL)

export const signup = (data) => {
  return api.post("/accounts/signup/", data);
};

export const login = (data) => {
  return api.post("/accounts/login/", data);
};