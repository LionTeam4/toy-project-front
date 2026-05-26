import api from "../api";

export const createReview = (data) => {
  return api.post("/festival/reviews/", data);
};