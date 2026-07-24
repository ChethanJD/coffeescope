/**
 * Formats an ISO date string as a short relative time ("2h ago", "3d ago").
 * Deliberately simple — swap for a library like `date-fns` if the app's
 * date-handling needs grow (timezones, i18n, etc).
 */
export function formatRelativeTime(isoDate: string): string {
  const then = new Date(isoDate).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  const diffWeek = Math.round(diffDay / 7);
  return `${diffWeek}w ago`;
}
