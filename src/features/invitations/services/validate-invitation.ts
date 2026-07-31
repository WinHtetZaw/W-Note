import { Invitation } from "../types";

export function validateInvitation(invitation: Invitation) {
  if (invitation.status === "accepted") {
    throw new Error("Invitation has already been accepted.");
  }

  if (invitation.status === "revoked") {
    throw new Error("Invitation has been revoked.");
  }

  if (invitation.expiresAt < new Date()) {
    throw new Error("Invitation has expired.");
  }
}
