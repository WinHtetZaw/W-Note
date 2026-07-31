import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { and, eq, gt, isNull } from "drizzle-orm";

export async function getUserPendingInvitations(email: string) {
  return db.query.workspaceInvitationsTable.findMany({
    where: and(
      eq(workspaceInvitationsTable.email, email.toLowerCase()),
      //   isNull(workspaceInvitationsTable.acceptedAt),
      //   isNull(workspaceInvitationsTable.revokedAt),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
    ),

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
