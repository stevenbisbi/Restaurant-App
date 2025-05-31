import axios from "axios";
import axiosClient from "./axiosClient";

export const getAllOrders = () => axiosClient.get("/orders/");

export const getOrder = (id) => axiosClient.get(`/orders/${id}/`);

export const createOrder = (order) => axiosClient.post("/orders/", order);

export const deleteOrder = (id) => axiosClient.delete(`/orders/${id}/`);

export const updateOrder = (id, order) =>
  axiosClient.put(`/orders/${id}/`, order);
