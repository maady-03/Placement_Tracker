import apiClient from "./apiClient";

export const getDashboardStats = () => apiClient.get("/api/dashboard/stats");