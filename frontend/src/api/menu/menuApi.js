import axiosClient from "../axiosClient";

export const getAllMenus = () => axiosClient.get("/menu/");

export const getMenu = (id) => axiosClient.get(`/menu/${id}/`);

export const createMenu = (menu) => axiosClient.post("/menu/", menu);

export const deleteMenu = (id) => axiosClient.delete(`/menu/${id}/`);

export const updateMenu = (id, menu) => axiosClient.put(`/menu/${id}/`, menu);
