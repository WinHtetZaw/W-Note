export type Result<T> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      message: string;
    };

export function ok<T>(data: T, message?: string): Result<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function fail(message: string): Result<never> {
  return {
    success: false,
    message,
  };
}
