/**
 * Formats a date as a relative-days phrase.
 * @param date - the target date (e.g., invitation expiresAt)
 * @returns e.g., "in 4 days", "tomorrow", "today", "3 days ago"
 */
export function formatExpiryInDays(date: Date): string {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Compare calendar days (midnight-to-midnight), not raw hours
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();

  const startOfTarget = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();

  const days: number = Math.round((startOfTarget - startOfToday) / MS_PER_DAY);

  if (days === 0) return "today";
  if (days === 1) return "tomorrow";

  if (days < 0) {
    const n = Math.abs(days);
    return `${n} ${n === 1 ? "day" : "days"} ago`;
  }

  return `in ${days} ${days === 1 ? "day" : "days"}`;
}
