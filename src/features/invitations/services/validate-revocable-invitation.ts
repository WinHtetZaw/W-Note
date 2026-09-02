import { now } from "@/lib/utils";
import { Invitation } from "../types";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";

export function validateRevocableInvitation(invitation: Invitation) {
  if (invitation.status === "accepted") {
    return fail({ reason: ErrorReason.InvitatioAlreadyAccepted });
  }

  if (invitation.status === "declined") {
    return fail({ reason: ErrorReason.InvitationAlreadyDeclined });
  }

  if (invitation.status === "revoked") {
    return fail({ reason: ErrorReason.InvitationAlreadyRevoked });
  }

  if (invitation.expiresAt < now()) {
    return fail({ reason: ErrorReason.InvitationExpired });
  }

  return ok(true);
}
