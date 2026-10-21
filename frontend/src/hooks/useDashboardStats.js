import { useCallback, useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";

export default function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getDashboardStats()
      .then((data) => active && setStats(data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setIsLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setStats(await getDashboardStats());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { stats, isLoading, error, refetch };
}