import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function revokeInvitation(invitationId: string) {
  const [updatedId] = await db
    .update(workspaceInvitationsTable)
    .set({ status: "revoked" })
    .where(eq(workspaceInvitationsTable.id, invitationId))
    .returning({ id: workspaceInvitationsTable.id });

  return !!updatedId;
}
