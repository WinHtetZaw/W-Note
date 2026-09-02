import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { eq } from "drizzle-orm";

type UpdateInvitationData = {
  invitationId: string;
  tokenHash: string;
  expiresAt: Date;
};

export async function updateInvitation(data: UpdateInvitationData) {
  const { invitationId, tokenHash, expiresAt } = data;
  const [updatedInvitation] = await db
    .update(workspaceInvitationsTable)
    .set({ tokenHash, expiresAt })
    .where(eq(workspaceInvitationsTable.id, invitationId))
    .returning({ id: workspaceInvitationsTable.id });

  return !!updatedInvitation;
}
