import axios from "axios";

const reservationApi = axios.create({
  baseURL: "/api/reservations/",
});

export const getAllReservations = () => reservationApi.get("/");

export const getReservation = (id) => reservationApi.get(`/${id}/`);

export const createReservation = (reservation) =>
  reservationApi.post("/", reservation);

export const deleteReservation = (id) => reservationApi.delete(`/${id}/`);

export const updateReservation = (id, reservation) =>
  reservationApi.put(`/${id}/`, reservation);
