import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { requireAuth } from "@/lib/permissions";
import { getUserPendingInvitations } from "../server/queries/get-user-pending-invitations";

export async function userPendingInvitationsService() {
  //========== Authentication ==========//
  const [error, authData] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }
  const email = authData.email;

  //========== DB mutation ==========//
  try {
    const res = await getUserPendingInvitations(email);
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
