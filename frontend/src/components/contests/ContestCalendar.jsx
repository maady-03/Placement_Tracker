import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import { PLATFORMS } from "../../utils/constants";
import {
  HOUR_HEIGHT,
  addDays,
  eventEnd,
  isSameDay,
  layoutDay,
  offsetFromMidnight,
  startOfDay,
  startOfWeek,
} from "../../utils/calendar";

const HOURS = Array.from({ length: 24 }, (_, h) => h);
const GRID_HEIGHT = 24 * HOUR_HEIGHT;
const GUTTER = 56;
const VIEWS = { week: "Week", day: "Day" };

const hourLines = {
  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${
    HOUR_HEIGHT - 1
  }px, var(--color-line) ${HOUR_HEIGHT - 1}px, var(--color-line) ${HOUR_HEIGHT}px)`,
};

const clock = (value) =>
  new Date(value).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

function heading(days) {
  const first = days[0];
  const last = days[days.length - 1];
  const long = (d) => d.toLocaleString("en-US", { month: "long" });
  const short = (d) => d.toLocaleString("en-US", { month: "short" });

  if (first.getMonth() === last.getMonth()) {
    return `${long(first)} ${first.getFullYear()}`;
  }
  if (first.getFullYear() === last.getFullYear()) {
    return `${short(first)} – ${short(last)} ${last.getFullYear()}`;
  }
  return `${short(first)} ${first.getFullYear()} – ${short(last)} ${last.getFullYear()}`;
}

function CalendarBody({ contests }) {
  const [view, setView] = useState("week");
  const [anchor, setAnchor] = useState(() => startOfDay(new Date()));
  const [now, setNow] = useState(() => new Date());
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Open near the current time instead of at midnight.
  useEffect(() => {
    scrollRef.current.scrollTop = Math.max(
      0,
      offsetFromMidnight(new Date()) - 2 * HOUR_HEIGHT
    );
  }, []);

  const days =
    view === "week"
      ? Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(anchor), i))
      : [anchor];
  const step = view === "week" ? 7 : 1;
  const showNow = days.some((day) => isSameDay(day, now));
  const columns = `${GUTTER}px repeat(${days.length}, minmax(0, 1fr))`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-ink">{heading(days)}</h3>

          <div className="flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              aria-label="Previous"
              onClick={() => setAnchor(addDays(anchor, -step))}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setAnchor(startOfDay(new Date()))}
            >
              Today
            </Button>
            <Button
              variant="secondary"
              size="sm"
              aria-label="Next"
              onClick={() => setAnchor(addDays(anchor, step))}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        <div className="inline-flex rounded-lg border border-line p-0.5">
          {Object.entries(VIEWS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              onClick={() => setView(key)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                view === key
                  ? "bg-accent/15 text-accent"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="max-h-[520px] overflow-auto border-t border-line">
        <div className={view === "week" ? "min-w-[720px]" : ""}>
          <div
            className="sticky top-0 z-30 grid border-b border-line bg-surface"
            style={{ gridTemplateColumns: columns }}
          >
            <div />
            {days.map((day) => {
              const today = isSameDay(day, now);

              return (
                <div
                  key={day.getTime()}
                  className="border-l border-line py-2 text-center"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">
                    {day.toLocaleString("en-US", { weekday: "short" })}
                  </p>
                  <span
                    className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm ${
                      today ? "bg-accent text-white" : "text-ink"
                    }`}
                  >
                    {day.getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="relative grid"
            style={{ gridTemplateColumns: columns, height: GRID_HEIGHT }}
          >
            <div className="relative">
              {HOURS.map((hour) => (
                <span
                  key={hour}
                  className="absolute right-2 font-mono text-[11px] text-ink-faint"
                  style={{ top: hour * HOUR_HEIGHT + 2 }}
                >
                  {String(hour).padStart(2, "0")}:00
                </span>
              ))}
            </div>

            {days.map((day) => (
              <div
                key={day.getTime()}
                className={`relative border-l border-line ${
                  isSameDay(day, now) ? "bg-accent/5" : ""
                }`}
                style={hourLines}
              >
                {layoutDay(contests, day).map(
                  ({ event, col, cols, top, height }) => {
                    const platform = PLATFORMS[event.platform];

                    return (
                      <a
                        key={`${event.id}-${day.getTime()}`}
                        href={event.url}
                        target="_blank"
                        rel="noreferrer"
                        title={event.name}
                        className={`absolute z-10 overflow-hidden rounded-md border-l-2 px-2 py-1 transition-opacity hover:opacity-80 ${
                          platform?.block ?? "border-line bg-surface-raised"
                        }`}
                        style={{
                          top,
                          height: height - 2,
                          left: `calc(${(col / cols) * 100}% + 2px)`,
                          width: `calc(${100 / cols}% - 4px)`,
                        }}
                      >
                        <p className="line-clamp-2 break-words text-xs font-medium text-ink">
                          {event.name}
                        </p>
                        <p className="font-mono text-[11px] text-ink-muted">
                          {clock(event.startTime)} – {clock(eventEnd(event))}
                        </p>
                      </a>
                    );
                  }
                )}
              </div>
            ))}

            {showNow && (
              <div
                className="pointer-events-none absolute right-0 z-20 flex -translate-y-1/2 items-center"
                style={{ top: offsetFromMidnight(now), left: GUTTER - 4 }}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-status-rejected" />
                <span className="h-px flex-1 bg-status-rejected" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContestCalendar({ contests, isLoading, error }) {
  const [open, setOpen] = useState(false);

  return (
    <Card as="section">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-3">
          <CalendarDays size={18} className="text-ink-faint" />
          <span className="text-sm font-semibold text-ink">Contest Calendar</span>
          {!isLoading && !error && (
            <span className="rounded-full bg-surface-raised px-2.5 py-0.5 font-mono text-xs text-ink-muted">
              {contests.length} upcoming
            </span>
          )}
        </span>

        <ChevronDown
          size={18}
          className={`text-ink-faint transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-line">
          {isLoading && <Skeleton className="m-5 h-64" />}

          {!isLoading && error && (
            <p className="px-5 py-6 text-sm text-status-rejected">{error}</p>
          )}

          {!isLoading && !error && <CalendarBody contests={contests} />}
        </div>
      )}
    </Card>
  );
}

export default ContestCalendar;