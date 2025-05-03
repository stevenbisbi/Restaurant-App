import axios from "axios";

const userApi = axios.create({
  baseURL: "/api/users/",
});

export const getAllUsers = () => userApi.get("/");

export const getUser = (id) => userApi.get(`/${id}/`);

export const createUser = (user) =>
  userApi.post("/", user);

export const deleteUser = (id) => userApi.delete(`/${id}/`);

export const updateUser = (id, user) =>
  userApi.put(`/${id}/`, user);
