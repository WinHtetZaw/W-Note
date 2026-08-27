import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";

type IncomingData = {
  workspaceId: string;
  userId: string;
};

export async function getUserWorkspaceRole({
  workspaceId,
  userId,
}: IncomingData) {
  const member = await db.query.workspaceMembersTable.findFirst({
    where: and(
      eq(workspaceMembersTable.workspaceId, workspaceId),
      eq(workspaceMembersTable.userId, userId),
    ),
    columns: { role: true },
  });

  return member?.role;
}
