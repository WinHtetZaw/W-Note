import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { and, eq, gt } from "drizzle-orm";

export async function getUserPendingInvitationsCount(workspaceId: string) {
  return db.$count(
    workspaceInvitationsTable,
    and(
      eq(workspaceInvitationsTable.workspaceId, workspaceId),
      eq(workspaceInvitationsTable.status, "pending"),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
    ),
  );
}
