import apiClient from "./apiClient";

export const getUpcomingContests = () =>
  apiClient.get("/api/contests/upcoming");