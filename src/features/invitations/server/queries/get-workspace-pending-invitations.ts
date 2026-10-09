import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { and, eq, gt, isNull } from "drizzle-orm";

export async function getWorkspacePendingInvitations(workspaceId: string) {
  return db.query.workspaceInvitationsTable.findMany({
    where: and(
      eq(workspaceInvitationsTable.workspaceId, workspaceId),
      isNull(workspaceInvitationsTable.acceptedAt),
      isNull(workspaceInvitationsTable.revokedAt),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
      // or(
      //   eq(workspaceInvitationsTable.status, "pending"),
      //   eq(workspaceInvitationsTable.status, "declined"),
      // ),
    ),
    columns: {
      id: true,
      email: true,
      status: true,
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

export type WorkspacePendingInvitations = NonNullable<
  Awaited<ReturnType<typeof getWorkspacePendingInvitations>>
>[number];
