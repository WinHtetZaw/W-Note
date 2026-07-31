import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getInvitationByEmail(workspaceId: string, email: string) {
  return db.query.workspaceInvitationsTable.findFirst({
    where: and(
      eq(workspaceInvitationsTable.workspaceId, workspaceId),
      eq(workspaceInvitationsTable.email, email),
    ),
  });
}
