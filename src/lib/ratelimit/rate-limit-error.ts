import { ErrorCode } from "../errors";

export class RateLimitError extends Error {
  readonly code = ErrorCode.RateLimited;

  constructor(public readonly retryAfter: number) {
    super("Too many requests. Please try again later.");
    this.name = "RateLimitError";
  }
}
