import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import { requireAuth } from "@/lib/permissions";
import { getUserPendingInvitationsCount } from "../server/queries/get-user-pending-invitations-count";

export async function userPendingInvitationsCountService() {
  //========== Authentication ==========//
  const [error, authData] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }
  const { email, id: userId } = authData;

  //========== DB Process ==========//
  try {
    const res = await getUserPendingInvitationsCount({ email, userId });
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
