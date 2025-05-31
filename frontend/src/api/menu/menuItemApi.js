import axiosClient from "../axiosClient";

export const getAllMenuItems = () => axiosClient.get("/menu/items/");

export const getMenuItem = (id) => axiosClient.get(`/menu/item/${id}/`);

export const createMenuItem = (menuitem) =>
  axiosClient.post("/menuitem/", menuitem);

export const deleteMenuItem = (id) => axiosClient.delete(`/menu/item/${id}/`);

export const updateMenuItem = (id, menuitem) =>
  axiosClient.put(`/menu/item/${id}/`, menuitem);
