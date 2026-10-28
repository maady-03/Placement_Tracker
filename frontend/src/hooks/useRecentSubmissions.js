import { useEffect, useState } from "react";
import { getRecentSubmissions } from "../api/dsa";

export default function useRecentSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getRecentSubmissions()
      .then((data) => active && setSubmissions(data.submissions ?? []))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setIsLoading(false));

    return () => {
      active = false;
    };
  }, []);

  return { submissions, isLoading, error };
}