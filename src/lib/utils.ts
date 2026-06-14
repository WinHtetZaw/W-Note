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
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + "s"}`;
};
