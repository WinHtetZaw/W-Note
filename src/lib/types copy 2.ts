import { db } from "@/db";

export type Result<T, M = Record<string, unknown>> =
  | {
      success: true;
      data: T;
      message?: string;
      meta?: M;
    }
  | {
      success: false;
      message: string;
    };

type OK<T, M = Record<string, unknown>> = {
  data: T;
  message?: string;
  meta?: M;
};
export function ok<T, M = Record<string, unknown>>({
  data,
  message,
  meta,
}: OK<T, M>): Result<T, M> {
  return {
    success: true,
    data,
    message,
    meta,
  };
}

export function fail(message: string): Result<never, never> {
  return {
    success: false,
    message,
  };
}

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
