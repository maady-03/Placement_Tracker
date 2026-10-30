export const HOUR_HEIGHT = 56;
const DEFAULT_MINUTES = 120;
const HOUR_MS = 3600000;

export const startOfDay = (value) => {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const addDays = (value, days) => {
  const d = new Date(value);
  d.setDate(d.getDate() + days);
  return d;
};

// Weeks start on Monday.
export const startOfWeek = (value) => {
  const d = startOfDay(value);
  return addDays(d, -((d.getDay() + 6) % 7));
};

export const isSameDay = (a, b) =>
  startOfDay(a).getTime() === startOfDay(b).getTime();

export const offsetFromMidnight = (value) => {
  const d = new Date(value);
  return ((d - startOfDay(d)) / HOUR_MS) * HOUR_HEIGHT;
};

// Clips events to one day and assigns columns so overlapping events sit side by side.
export function layoutDay(events, day) {
  const dayStart = startOfDay(day).getTime();
  const dayEnd = addDays(day, 1).setHours(0, 0, 0, 0);

  const items = [];
  for (const event of events) {
    const start = new Date(event.startTime).getTime();
    const end = start + (event.durationMinutes || DEFAULT_MINUTES) * 60000;
    if (start >= dayEnd || end <= dayStart) continue;

    items.push({
      event,
      start: Math.max(start, dayStart),
      end: Math.min(end, dayEnd),
      col: 0,
      cols: 1,
    });
  }
  items.sort((a, b) => a.start - b.start || b.end - a.end);

  let cluster = [];
  let clusterEnd = 0;

  const flush = () => {
    const columnEnds = [];
    for (const item of cluster) {
      let col = columnEnds.findIndex((end) => end <= item.start);
      if (col === -1) col = columnEnds.length;
      columnEnds[col] = item.end;
      item.col = col;
    }
    for (const item of cluster) item.cols = columnEnds.length;
    cluster = [];
    clusterEnd = 0;
  };

  for (const item of items) {
    if (cluster.length && item.start >= clusterEnd) flush();
    cluster.push(item);
    clusterEnd = Math.max(clusterEnd, item.end);
  }
  if (cluster.length) flush();

  return items.map(({ event, start, end, col, cols }) => ({
    event,
    col,
    cols,
    top: ((start - dayStart) / HOUR_MS) * HOUR_HEIGHT,
    height: Math.max(((end - start) / HOUR_MS) * HOUR_HEIGHT, 24),
  }));
}

export const eventEnd = (event) =>
  new Date(
    new Date(event.startTime).getTime() +
      (event.durationMinutes || DEFAULT_MINUTES) * 60000
  );