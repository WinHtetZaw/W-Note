import { workspaceInvitationsTable } from "@/db/schema";
import { Transaction } from "@/lib/types";
import { now } from "@/lib/utils";
import { eq } from "drizzle-orm";

export async function markInvitationAccepted(
  tx: Transaction,
  invitationId: string,
) {
  const [invitation] = await tx
    .update(workspaceInvitationsTable)
    .set({ status: "accepted", acceptedAt: now() })
    .where(eq(workspaceInvitationsTable.id, invitationId))
    .returning();

  return invitation;
}
