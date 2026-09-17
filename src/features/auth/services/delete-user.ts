import { auth } from "@/lib/auth";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { headers } from "next/headers";

export async function deleteUser(password: string) {
  try {
    const { success } = await auth.api.deleteUser({
      headers: await headers(),
      body: {
        password,
      },
    });
    return ok(success);
  } catch (err) {
    return fail({
      reason: ErrorReason.UnexpectedError,
      details: err,
    });
  }
}
