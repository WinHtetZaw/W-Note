import { now } from "@/lib/utils";
import { Invitation } from "../types";

export function validateRevocableInvitation(invitation: Invitation) {
  if (invitation.status === "accepted") {
    throw new Error("Accepted invitations cannot be revoked.");
  }

  if (invitation.status === "revoked") {
    throw new Error("Invitation has already been revoked.");
  }

  if (invitation.expiresAt < now()) {
    throw new Error("Invitation has already expired.");
  }
}
