import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

export async function getWorkspaceInvitationByEmail(
  workspaceId: string,
  email: string,
) {
  return db.query.workspaceInvitationsTable.findFirst({
    where: and(
      eq(workspaceInvitationsTable.workspaceId, workspaceId),
      eq(workspaceInvitationsTable.email, email.toLowerCase()),
      //   isNull(workspaceInvitationsTable.acceptedAt),
      //   isNull(workspaceInvitationsTable.revokedAt),
    ),
  });
}
