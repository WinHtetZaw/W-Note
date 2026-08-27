import { ErrorReason } from "../errors/error-reason";
import { fail, ok } from "../result";
import { getCurrentUser } from "./get-current-user";

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) return fail({ reason: ErrorReason.UserNotAuthenticated });
  return ok(user);
}
