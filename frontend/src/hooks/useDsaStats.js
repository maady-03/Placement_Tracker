import { useCallback, useEffect, useState } from "react";
import { getDsaStats, syncDsa } from "../api/dsa";

export default function useDsaStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");

  useEffect(() => {
    let active = true;

    getDsaStats()
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
      setStats(await getDsaStats());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Forces a platform refresh, then reloads the stats without a skeleton flash.
  const sync = useCallback(async () => {
    setIsSyncing(true);
    setSyncError("");

    try {
      await syncDsa();
      setStats(await getDsaStats());
    } catch (err) {
      setSyncError(err.message);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return { stats, isLoading, error, refetch, sync, isSyncing, syncError };
}