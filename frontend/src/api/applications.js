import apiClient from "./apiClient";

export const getApplications = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/api/applications${query ? `?${query}` : ""}`);
};

export const createApplication = (payload) =>
  apiClient.post("/api/applications", payload);

export const getApplication = (id) => apiClient.get(`/api/applications/${id}`);

export const changeApplicationStatus = (id, { status, note }) =>
  apiClient.patch(`/api/applications/${id}/status`, { status, note });

export const updateApplication = (id, payload) =>
  apiClient.put(`/api/applications/${id}`, payload);

export const deleteApplication = (id) =>
  apiClient.delete(`/api/applications/${id}`);