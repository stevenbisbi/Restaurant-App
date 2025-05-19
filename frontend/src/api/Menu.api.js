import axios from "axios";

const menuApi = axios.create({
  baseURL: "/api/menu/",
});

export const getAllMenus = () => menuApi.get("/");

export const getMenu = (id) => menuApi.get(`/${id}/`);

export const createMenu = (menu) => menuApi.post("/", menu);

export const deleteMenu = (id) => menuApi.delete(`/${id}/`);

export const updateMenu = (id, menu) => menuApi.put(`/${id}/`, menu);
