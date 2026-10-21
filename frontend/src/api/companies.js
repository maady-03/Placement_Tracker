import apiClient from "./apiClient";

export const getCompanies = () => apiClient.get("/api/companies");

export const createCompany = (payload) =>
  apiClient.post("/api/companies", payload);

export const updateCompany = (id, payload) =>
  apiClient.put(`/api/companies/${id}`, payload);

export const deleteCompany = (id) => apiClient.delete(`/api/companies/${id}`);