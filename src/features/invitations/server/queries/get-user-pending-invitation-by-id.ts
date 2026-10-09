import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";

export async function getUserPendingInvitationById(invitationId: string) {
  return db.query.workspaceInvitationsTable.findFirst({
    where: and(
      eq(workspaceInvitationsTable.id, invitationId),
      eq(workspaceInvitationsTable.status, "pending"),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
    ),
    columns: {
      id: true,
      email: true,
      expiresAt: true,
      role: true,
      updatedAt: true,
    },

    with: {
      workspace: {
        columns: {
          id: true,
          name: true,
        },
      },

      inviter: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
}
