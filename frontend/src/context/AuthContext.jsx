import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import apiClient, { setUnauthorizedHandler } from "../api/apiClient";

export const AuthContext = createContext(null);

const fetchCurrentUser = () => apiClient.get("/api/profile/me");

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the session from the HTTP-only cookie on first load.
  useEffect(() => {
    let active = true;

    fetchCurrentUser()
      .then((data) => active && setUser(data))
      .catch(() => active && setUser(null))
      .finally(() => active && setIsLoading(false));

    return () => {
      active = false;
    };
  }, []);

  // Any 401 from the API ends the session.
  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null));
    return () => setUnauthorizedHandler(null);
  }, []);

  const login = useCallback(async (loginId, password) => {
    await apiClient.post("/login", { email: loginId, password });
    const currentUser = await fetchCurrentUser();
    setUser(currentUser);
    return currentUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/logout");
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      setUser,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;