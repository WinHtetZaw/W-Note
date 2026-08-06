import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { and, eq, gt, isNull } from "drizzle-orm";

export async function getUserPendingInvitationsCount(email: string) {
  return db.$count(
    workspaceInvitationsTable,
    eq(workspaceInvitationsTable.email, email),
  );
}
