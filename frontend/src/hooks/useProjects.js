import { useCallback, useEffect, useState } from "react";
import { getProjects } from "../api/projects";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProjects()
      .then((data) => active && setProjects(data.projects ?? []))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setIsLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const refetch = useCallback(async () => {
    setError("");

    try {
      const data = await getProjects();
      setProjects(data.projects ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { projects, isLoading, error, refetch };
}