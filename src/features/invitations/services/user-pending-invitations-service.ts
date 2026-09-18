import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import { requireAuth } from "@/lib/permissions";
import { getUserPendingInvitations } from "../server/queries/get-user-pending-invitations";

export async function userPendingInvitationsService() {
  //========== Authentication ==========//
  const [error, authData] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }
  const { email, id: userId } = authData;

  //========== DB process ==========//
  try {
    const res = await getUserPendingInvitations({ email, userId });
    return ok({ userId: authData.id, invitations: res });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
