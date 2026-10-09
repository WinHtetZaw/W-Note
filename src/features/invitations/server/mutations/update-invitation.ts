import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { eq } from "drizzle-orm";
import { InvitationStatus } from "../../types";

type UpdateInvitationData = {
  invitationId: string;
  tokenHash: string;
  expiresAt: Date;
  status: InvitationStatus;
};

export async function updateInvitation(data: UpdateInvitationData) {
  const { invitationId, tokenHash, expiresAt, status } = data;
  const [updatedInvitation] = await db
    .update(workspaceInvitationsTable)
    .set({ tokenHash, expiresAt, status })
    .where(eq(workspaceInvitationsTable.id, invitationId))
    .returning({ id: workspaceInvitationsTable.id });

  return !!updatedInvitation;
}
