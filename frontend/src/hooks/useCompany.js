import { useEffect, useState } from "react";
import { getCompany } from "../api/companies";

const EMPTY = { key: null, company: null, error: "", status: null };

export default function useCompany(id) {
  const [result, setResult] = useState(EMPTY);

  useEffect(() => {
    let active = true;

    getCompany(id)
      .then(
        (data) =>
          active &&
          setResult({ key: id, company: data.company, error: "", status: 200 })
      )
      .catch(
        (err) =>
          active &&
          setResult({ key: id, company: null, error: err.message, status: err.status })
      );

    return () => {
      active = false;
    };
  }, [id]);

  return {
    company: result.company,
    error: result.error,
    notFound: result.status === 404,
    isLoading: result.key !== id,
  };
}