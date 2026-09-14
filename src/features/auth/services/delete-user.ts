import { auth } from "@/lib/auth";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";

export async function deleteUser() {
  try {
    const { success } = await auth.api.deleteUser();
    return ok(success);
  } catch (err) {
    return fail({
      reason: ErrorReason.UnexpectedError,
      details: err,
    });
  }
}
