import apiClient from "./apiClient";

export const getDsaStats = () => apiClient.get("/api/dsa/stats");

export const syncDsa = () => apiClient.post("/api/dsa/sync");

export const updateDsaPlatforms = (handles) =>
  apiClient.put("/api/dsa/platforms", handles);

export const getUpcomingContests = () =>
  apiClient.get("/api/dsa/contests/upcoming");

export const getRecentSubmissions = () =>
  apiClient.get("/api/dsa/recent-submissions");