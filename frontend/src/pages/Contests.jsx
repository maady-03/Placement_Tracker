import useUpcomingContests from "../hooks/useUpcomingContests";
import ContestCalendar from "../components/contests/ContestCalendar";
import UpcomingContests from "../components/contests/UpcomingContests";

const MAX_CALENDAR_MINUTES = 24 * 60;

function Contests() {
  const { contests, isLoading, error } = useUpcomingContests();

  // Week-long practice rounds would fill whole columns, so only the list shows them.
  const timed = contests.filter(
    (contest) => (contest.durationMinutes ?? 0) <= MAX_CALENDAR_MINUTES
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Contests</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Upcoming rounds on LeetCode, Codeforces and CodeChef.
        </p>
      </div>

      <ContestCalendar
        contests={timed}
        isLoading={isLoading}
        error={error}
        defaultOpen
      />

      <UpcomingContests
        contests={contests}
        isLoading={isLoading}
        error={error}
        maxRows={12}
      />
    </div>
  );
}

export default Contests;