import axios from "axios";

const tableApi = axios.create({
  baseURL: "/api/tables/",
});

export const getAllTables = () => tableApi.get("/");

export const getTable = (id) => tableApi.get(`/${id}/`);

export const createTable = (table) => tableApi.post("/", table);

export const deleteTable = (id) => tableApi.delete(`/${id}/`);

export const updateTable = (id, table) => tableApi.put(`/${id}/`, table);
