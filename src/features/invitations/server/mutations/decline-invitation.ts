import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function declineInvitation(invitationId: string) {
  const [invitation] = await db
    .update(workspaceInvitationsTable)
    .set({ status: "declined" })
    .where(eq(workspaceInvitationsTable.id, invitationId))
    .returning({ invitationId: workspaceInvitationsTable.id });

  return invitation;
}
