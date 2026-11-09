import apiClient from "./apiClient";

export const getProjects = () => apiClient.get("/api/projects");

export const createProject = (payload) =>
  apiClient.post("/api/projects", payload);

export const updateProject = (id, payload) =>
  apiClient.put(`/api/projects/${id}`, payload);

export const deleteProject = (id) => apiClient.delete(`/api/projects/${id}`);