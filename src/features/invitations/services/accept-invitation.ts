import { db } from "@/db";
import { createWorkspaceMember } from "../schemas/mutations/create-workspace-member";
import { markInvitationAccepted } from "../schemas/mutations/mark-invitation-accepted";
import { Invitation } from "../types";

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
