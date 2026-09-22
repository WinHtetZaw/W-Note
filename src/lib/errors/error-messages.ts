export const errorMessages = {
  VALIDATION_ERROR: "Invalid input. Please check and try again.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: "We couldn't find what you're looking for.",
  INTERNAL_ERROR: "Something went wrong. Please try again.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
  CONFLICT: "The resource already exists or there is a conflict.",
  EMAIL_NOT_SENT: "Failed to send the invitation email. Please try again.",
  PLAN_LIMIT_REACHED:
    "You have reached the limit for this feature. Please upgrade your plan to continue using it.",
  FEATURE_NOT_AVAILABLE:
    "This feature is not available on your current plan. Please upgrade your plan to access it.",
} as const;

// CONFLICT: "The resource already exists.",
// OWNER_CANNOT_LEAVE_WORKSPACE:
//   "Owners cannot leave the workspace without transferring ownership.",
