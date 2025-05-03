import axios from "axios";

const paymentApi = axios.create({
  baseURL: "/api/payments/",
});

export const getAllPayments = () => paymentApi.get("/");

export const getPayment = (id) => paymentApi.get(`/${id}/`);

export const createPayment = (payment) => paymentApi.post("/", payment);

export const deletePayment = (id) => paymentApi.delete(`/${id}/`);

export const updatePayment = (id, payment) =>
  paymentApi.put(`/${id}/`, payment);
