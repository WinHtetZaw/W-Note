import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringEquals(a: string, b: string) {
  return a.toLocaleLowerCase() === b.toLocaleLowerCase();
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const handleToast = (success: boolean, message: string) => {
  if (!success) {
    toast.error(message ?? "Something wrong!");
    return;
  }
  toast.success(message ?? "Success");
};

export const pluralize = (
  count: number | string,
  singular: string,
  plural?: string,
) => {
  if (typeof count === "string") count = +count;
  if (count <= 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + "s"}`;
};

export function timeAgo(date: Date | string | number): string {
  const inputDate = new Date(date);
  const seconds = Math.floor((Date.now() - inputDate.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);

    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export const now = () => new Date();
