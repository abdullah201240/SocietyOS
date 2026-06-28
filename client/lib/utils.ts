import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────────
// Currency & Numbers
// ─────────────────────────────────────────────

/**
 * Format a number as a localized currency string.
 * @example formatCurrency(1500) → "$1,500.00"
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number with commas.
 * @example formatNumber(1234567) → "1,234,567"
 */
export function formatNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value);
}

// ─────────────────────────────────────────────
// Dates
// ─────────────────────────────────────────────

/**
 * Format an ISO date string to a readable date.
 * @example formatDate("2024-01-15") → "Jan 15, 2024"
 */
export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  locale = "en-US"
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Format a date as a relative time string.
 * @example formatRelativeTime("2024-01-14") → "2 days ago"
 */
export function formatRelativeTime(value: string | Date, locale = "en-US"): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return "—";

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const now = Date.now();
  const diffMs = date.getTime() - now;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHrs = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHrs / 24);

  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, "second");
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  if (Math.abs(diffHrs) < 24) return rtf.format(diffHrs, "hour");
  if (Math.abs(diffDays) < 30) return rtf.format(diffDays, "day");
  return formatDate(date);
}

// ─────────────────────────────────────────────
// Strings
// ─────────────────────────────────────────────

/**
 * Truncate a string to `maxLength` characters, appending an ellipsis.
 * @example truncate("Hello World", 7) → "Hello W…"
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "…";
}

/**
 * Convert a string to title case.
 * @example toTitleCase("hello world") → "Hello World"
 */
export function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Generate initials from a full name.
 * @example getInitials("John Doe") → "JD"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─────────────────────────────────────────────
// Functions
// ─────────────────────────────────────────────

/**
 * Debounce a function call by `delay` milliseconds.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Sleep for `ms` milliseconds (useful in async handlers).
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
