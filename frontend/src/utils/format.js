const DAY_MS = 24 * 60 * 60 * 1000;

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const formatDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

// Whole calendar days from today; negative means the date has passed.
export const daysUntil = (value) =>
  Math.round((startOfDay(value) - startOfDay(new Date())) / DAY_MS);

export const formatDaysLeft = (value) => {
  const days = daysUntil(value);

  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days > 1) return `${days} days`;
  return `${Math.abs(days)}d overdue`;
};

export const toHref = (url) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

export const isValidUrl = (value) => {
  try {
    new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return true;
  } catch {
    return false;
  }
};

// ISO string -> value for <input type="date">
export const toDateInputValue = (value) => (value ? value.slice(0, 10) : "");

export const formatTimeAgo = (value) => {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(value)) / 60000));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
};