import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:8000/api/users",
});

export const getAllUsers = () => userApi.get("/");

export const getUser = (id) => userApi.get(`/${id}/`);

export const createUser = (user) =>
  userApi.post("/register/", user);

export const deleteUser = (id) => userApi.delete(`/${id}/`);

export const updateUser = (id, user) =>
  userApi.put(`/${id}/`, user);
