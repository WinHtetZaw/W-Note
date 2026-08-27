import { db } from "@/db";
import { Invitation } from "../../types";
import { createWorkspaceMember } from "./create-workspace-member";
import { markInvitationAccepted } from "./mark-invitation-accepted";

type AcceptInvitationData = {
  invitation: Invitation;
  userId: string;
};

export async function acceptInvitation(data: AcceptInvitationData) {
  const { invitation, userId } = data;

  return db.transaction(async (tx) => {
    const member = await createWorkspaceMember(tx, {
      workspaceId: invitation.workspaceId,
      userId,
      role: invitation.role,
    });

    await markInvitationAccepted(tx, invitation.id);
    return member;
  });
}
