import { useEffect, useState } from "react";
import { getRoles } from "../api/applications";

// Suggestions only, so a failed request is ignored.
export default function useRoles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    let active = true;

    getRoles()
      .then((data) => active && setRoles(data.roles ?? []))
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return roles;
}