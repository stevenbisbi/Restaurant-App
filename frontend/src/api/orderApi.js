import axios from "axios";

const orderApi = axios.create({
  baseURL: "/api/orders/",
});

export const getAllOrders = () => orderApi.get("/");

export const getOrder = (id) => orderApi.get(`/${id}/`);

export const createOrder = (order) => orderApi.post("/", order);

export const deleteOrder = (id) => orderApi.delete(`/${id}/`);

export const updateOrder = (id, order) => orderApi.put(`/${id}/`, order);
