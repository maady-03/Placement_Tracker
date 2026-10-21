import { useCallback, useEffect, useState } from "react";
import { getApplications } from "../api/applications";

const EMPTY = { key: null, applications: [], pagination: null, error: "" };

export default function useApplications(params = {}) {
  const [result, setResult] = useState(EMPTY);
  const [reloadToken, setReloadToken] = useState(0);

  // Stable key so an inline `{ limit: 5 }` doesn't refetch on every render.
  const paramsKey = JSON.stringify(params);
  const requestKey = `${paramsKey}#${reloadToken}`;

  useEffect(() => {
    let active = true;
    const key = `${paramsKey}#${reloadToken}`;

    getApplications(JSON.parse(paramsKey))
      .then((data) => {
        if (!active) return;
        setResult({
          key,
          applications: data.applications ?? [],
          pagination: data.pagination ?? null,
          error: "",
        });
      })
      .catch((err) => {
        if (!active) return;
        setResult({ ...EMPTY, key, error: err.message });
      });

    return () => {
      active = false;
    };
  }, [paramsKey, reloadToken]);

  const refetch = useCallback(() => setReloadToken((token) => token + 1), []);

  return {
    applications: result.applications,
    pagination: result.pagination,
    error: result.error,
    // Loading whenever the latest result belongs to an older request.
    isLoading: result.key !== requestKey,
    refetch,
  };
}