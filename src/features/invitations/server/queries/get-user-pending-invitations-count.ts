import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { and, eq, gt } from "drizzle-orm";
import { cacheTag } from "next/cache";

type IncomingData = { email: string; userId: string };

export async function getUserPendingInvitationsCount({
  email,
  userId,
}: IncomingData) {
  "use cache";
  cacheTag(cacheTags.userInvitations(userId));

  return db.$count(
    workspaceInvitationsTable,
    and(
      eq(workspaceInvitationsTable.email, email),
      eq(workspaceInvitationsTable.status, "pending"),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
    ),
  );
}
