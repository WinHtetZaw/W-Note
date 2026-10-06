import { ErrorReason } from "../errors";
import { fail, ok } from "../result";
import { rateLimiters } from "./limiters";
import { RateLimiterName, RateLimitIdentifier } from "./types";

export async function checkRateLimit(
  limiter: RateLimiterName,
  identifier: RateLimitIdentifier,
) {
  try {
    const result = await rateLimiters[limiter].limit(identifier);

    console.log("RATE LIMIT:", {
      limiter,
      identifier,
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: new Date(result.reset).toISOString(),
    });

    if (!result.success) {
      return fail({ reason: ErrorReason.RateLimited, details: result });
    }

    const data = {
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };

    return ok(data);
  } catch (error) {
    return fail({ reason: ErrorReason.UnexpectedError, details: error });
  }
}
