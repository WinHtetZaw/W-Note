import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

export async function createInvitation(
  data: typeof workspaceInvitationsTable.$inferInsert,
) {
  const [invitation] = await db
    .insert(workspaceInvitationsTable)
    .values(data)
    .returning();

  return invitation;
}
