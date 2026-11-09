import apiClient from "./apiClient";

// Returns { message, user }. Pass only the fields being changed.
export const updateProfile = (payload) =>
  apiClient.put("/api/profile/me", payload);
export const getProfilePreview = () => apiClient.get("/api/profile/preview");