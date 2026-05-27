import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringEquals(a: string, b: string) {
  return a.toLocaleLowerCase() === b.toLocaleLowerCase();
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
