import { useEffect, useState } from "react";
import { getUpcomingContests } from "../api/dsa";

const PLATFORMS = ["leetcode", "codeforces", "codechef"];

export default function useUpcomingContests() {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getUpcomingContests()
      .then((data) => {
        if (!active) return;

        // Merge all platforms into one list, soonest first.
        const merged = PLATFORMS.flatMap((platform) => data[platform] ?? []);
        merged.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        setContests(merged);
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setIsLoading(false));

    return () => {
      active = false;
    };
  }, []);

  return { contests, isLoading, error };
}