import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

export async function getUserByEmail(workspaceId: string, email: string) {
  return db.query.workspaceInvitationsTable.findFirst({
    where: and(
      eq(workspaceInvitationsTable.workspaceId, workspaceId),
      eq(workspaceInvitationsTable.email, email.toLowerCase()),
    ),
  });
}

export type User = NonNullable<Awaited<ReturnType<typeof getUserByEmail>>>;
