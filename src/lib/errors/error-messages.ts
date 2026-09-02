export const errorMessages = {
  VALIDATION_ERROR: "Invalid input. Please check and try again.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: "We couldn't find what you're looking for.",
  INTERNAL_ERROR: "Something went wrong. Please try again.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
  // CONFLICT: "The resource already exists.",
  CONFLICT: "The resource already exists or there is a conflict.",
  EMAIL_NOT_SENT: "Failed to send the invitation email. Please try again.",
  // OWNER_CANNOT_LEAVE_WORKSPACE:
  //   "Owners cannot leave the workspace without transferring ownership.",
} as const;
