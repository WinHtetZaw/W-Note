import { db } from "@/db";

type FailureResult = {
  success: false;
  message: string;
};

type SuccessResult<T, Extra extends Record<string, unknown> = Record<string, never>> = {
  success: true;
  data: T;
  message?: string;
} & Extra;

export type Result<T, Extra extends Record<string, unknown> = Record<string, never>> =
  | SuccessResult<T, Extra>
  | FailureResult;

export function ok<T, Extra extends Record<string, unknown> = Record<string, never>>(
  data: T,
  message?: string,
  extra?: Extra,
): Result<T, Extra> {
  return {
    success: true,
    data,
    message,
    ...extra,
  } as Result<T, Extra>;
}

export function fail(message: string): Result<never> {
  return {
    success: false,
    message,
  };
}

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
