import api from "../api";

export const getCommunityPosts = () => {
  return api.get("/festival/post");
};

export const createCommunityPost = (data) => {
  return api.post("/festival/post", data);
};

export const getCommunityDetail = (id) => {
  return api.get(`/festival/post/${id}`);
};

export const updateCommunityPost = (id, data) => {
  return api.put(`/festival/post/${id}`, data);
};

export const deleteCommunityPost = (id) => {
  return api.delete(`/festival/post/${id}`);
};

export const createComment = (data) => {
  return api.post("/festival/post/comments/", data);
};