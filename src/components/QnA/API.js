import axios from "axios";

const API = axios.create({
  baseURL: "http://68.183.183.118:4088/api/v1"
});

export const getQuestions = () => {
  return API.get("/questions");
};

export const getAnswers = () => {
  return API.get("/answers");
};

export default API;