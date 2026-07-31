import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { and, eq, isNull, gt, desc } from "drizzle-orm";

export async function getWorkspaceInvitations(workspaceId: string) {
  return db.query.workspaceInvitationsTable.findMany({
    where: and(
      eq(workspaceInvitationsTable.workspaceId, workspaceId),
      //   isNull(workspaceInvitationsTable.acceptedAt),
      //   isNull(workspaceInvitationsTable.revokedAt),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
    ),

    with: {
      inviter: {
        columns: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },

    orderBy: [desc(workspaceInvitationsTable.createdAt)],
  });
}

export type InvitationWithInviter = NonNullable<
  Awaited<ReturnType<typeof getWorkspaceInvitations>>
>[number];
