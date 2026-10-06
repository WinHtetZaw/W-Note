export const ErrorCode = {
  // User is not authenticated
  Unauthenticated: "UNAUTHENTICATED",

  // Request data is invalid
  Validation: "VALIDATION_ERROR",

  // User is authenticated but lacks permission
  Forbidden: "FORBIDDEN",

  // Requested resource does not exist
  NotFound: "NOT_FOUND",

  // Request conflicts with the current resource state
  Conflict: "CONFLICT",

  // User has reached a limit imposed by their plan
  PlanLimitReached: "PLAN_LIMIT_REACHED",

  // Feature is not available for the user's current plan or configuration
  FeatureNotAvailable: "FEATURE_NOT_AVAILABLE",

  // Too many requests in a short period
  RateLimited: "RATE_LIMITED",

  // A specific usage quota has been exhausted
  QuotaExceeded: "QUOTA_EXCEEDED",

  // Unexpected server-side error
  Internal: "INTERNAL_ERROR",
} as const;
