import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getWorkspaceByUserId(userId: string) {
  return db.query.workspaceMembersTable.findFirst({
    where: eq(workspaceMembersTable.userId, userId),
  });
}
