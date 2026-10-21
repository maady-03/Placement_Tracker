import { useCallback, useEffect, useState } from "react";
import { getCompanies } from "../api/companies";

export default function useCompanies() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getCompanies()
      .then((data) => active && setCompanies(data.companies ?? []))
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
      const data = await getCompanies();
      setCompanies(data.companies ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { companies, isLoading, error, refetch };
}