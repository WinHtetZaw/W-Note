import { AppError } from "./app-error";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
  }
}

export class UnauthenticatedError extends AppError {
  constructor(message = "Unauthenticated") {
    super(message, "Unauthenticated", 401);
  }
}
