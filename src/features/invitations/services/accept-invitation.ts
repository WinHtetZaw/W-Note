import { db } from "@/db";
import { Invitation } from "../types";
import { createWorkspaceMember } from "../server/mutations/create-workspace-member";
import { markInvitationAccepted } from "../server/mutations/mark-invitation-accepted";

// type AcceptInvitationData = {
//   invitation: {
//     id: string;
//     workspaceId: string;
//     role: "admin" | "member";
//   };

//   userId: string;
// };

type AcceptInvitationData = {
  invitation: Invitation;
  userId: string;
};

export async function acceptInvitation({
  invitation,
  userId,
}: AcceptInvitationData) {
  return db.transaction(async (tx) => {
    await createWorkspaceMember(tx, {
      workspaceId: invitation.workspaceId,
      userId,
      role: invitation.role,
    });

    await markInvitationAccepted(tx, invitation.id);
  });
}
