import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { eq } from "drizzle-orm";

type UpdateInvitationData = {
  token: string;
  expiresAt: Date;
};

export async function updateInvitation(
  invitationId: string,
  data: UpdateInvitationData,
) {
  const [invitation] = await db
    .update(workspaceInvitationsTable)
    .set({
      token: data.token,
      expiresAt: data.expiresAt,
    })
    .where(eq(workspaceInvitationsTable.id, invitationId))
    .returning();

  return invitation;
}
