import api from "../api";

export const getFestivalList = () => {
  return api.get("/festival/");
};

export const createFestival = (data) => {
  return api.post("/festival/", data);
};

export const getFestivalDetail = (id) => {
  return api.get(`/festival/${id}/`);
};

export const updateFestival = (id, data) => {
  return api.put(`/festival/${id}/`, data);
};

export const deleteFestival = (id) => {
  return api.delete(`/festival/${id}/`);
};

export const getPostList = () => {
  return api.get("/festival/post");
};

export const getPostDetail = (id) => {
  return api.get(`/festival/post/${id}`);
};