export const ErrorCode = {
  Unauthenticated: "UNAUTHENTICATED",
  Validation: "VALIDATION_ERROR",
  Forbidden: "FORBIDDEN",
  NotFound: "NOT_FOUND",
  Conflict: "CONFLICT",
  PlanLimitReached: "PLAN_LIMIT_REACHED",
  FeatureNotAvailable: "FEATURE_NOT_AVAILABLE",
  Internal: "INTERNAL_ERROR",
} as const;
