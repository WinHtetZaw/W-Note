import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { and, eq, gt, isNull } from "drizzle-orm";

export async function getInviteLink(workspaceId: string) {
  return db.query.workspaceInvitationsTable.findFirst({
    where: and(
      eq(workspaceInvitationsTable.workspaceId, workspaceId),
      //   eq(workspaceInvitationsTable.type, "link"),
      //   isNull(workspaceInvitationsTable.revokedAt),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
    ),
  });
}
