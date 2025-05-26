import axiosClient from "../axiosClient";

export const getAllmenuItems = () => axiosClient.get("/menu_items/");

export const getmenu_item = (id) => axiosClient.get(`/menu_item/${id}/`);

export const createmenu_item = (menu_item) =>
  axiosClient.post("/menu_item/", menu_item);

export const deletemenu_item = (id) => axiosClient.delete(`/menu_item/${id}/`);

export const updatemenu_item = (id, menu_item) =>
  axiosClient.put(`/menu_item/${id}/`, menu_item);
