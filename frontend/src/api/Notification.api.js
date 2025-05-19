import axios from "axios";

const notificationApi = axios.create({
  baseURL: "/api/notifications/",
});

export const getAllNotifications = () => notificationApi.get("/");

export const getNotification = (id) => notificationApi.get(`/${id}/`);

export const createNotification = (notification) =>
  notificationApi.post("/", notification);

export const deleteNotification = (id) => notificationApi.delete(`/${id}/`);

export const updateNotification = (id, notification) =>
  notificationApi.put(`/${id}/`, notification);
