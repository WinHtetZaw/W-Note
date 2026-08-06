export type EmailResult =
  | {
      success: true;
      data: unknown;
    }
  | {
      success: false;
      error: unknown;
    };
