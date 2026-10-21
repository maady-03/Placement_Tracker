import { useCallback, useEffect, useState } from "react";
import { getApplication } from "../api/applications";

const EMPTY = { key: null, application: null, error: "", status: null };

export default function useApplication(id) {
  const [result, setResult] = useState(EMPTY);
  const [reloadToken, setReloadToken] = useState(0);

  const requestKey = `${id}#${reloadToken}`;

  useEffect(() => {
    let active = true;
    const key = `${id}#${reloadToken}`;

    getApplication(id)
      .then((data) => {
        if (!active) return;
        setResult({ key, application: data.application, error: "", status: 200 });
      })
      .catch((err) => {
        if (!active) return;
        setResult({ key, application: null, error: err.message, status: err.status });
      });

    return () => {
      active = false;
    };
  }, [id, reloadToken]);

  const refetch = useCallback(() => setReloadToken((token) => token + 1), []);

  // Used after PATCH status: the response is the full updated application.
  const replaceApplication = useCallback(
    (application) =>
      setResult((previous) => ({ ...previous, application, error: "" })),
    []
  );

  return {
    application: result.application,
    error: result.error,
    notFound: result.status === 404,
    isLoading: result.key !== requestKey,
    refetch,
    replaceApplication,
  };
}