import axiosClient from "./axiosClient";

export const getAllReservations = () => reservationApi.get("/");

export const getReservation = (id) => reservationApi.get(`/${id}/`);

export const createReservation = (reservation) =>
  reservationApi.post("/", reservation);

export const deleteReservation = (id) => reservationApi.delete(`/${id}/`);

export const updateReservation = (id, reservation) =>
  reservationApi.put(`/${id}/`, reservation);
