import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getInvitationById(invitationId: string) {
  return db.query.workspaceInvitationsTable.findFirst({
    where: eq(workspaceInvitationsTable.id, invitationId),
  });
}
