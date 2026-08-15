import { fail, ok } from "../result";
import { getCurrentUser } from "./get-current-user";

export async function requireAuth() {
  const user = await getCurrentUser();
  // if (!user) throw new Error("Unauthorized");
  if (!user) return fail({ reason: "Unauthenticated" });
  return ok(user);
}
