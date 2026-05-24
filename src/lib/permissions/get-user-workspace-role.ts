import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { WorkspaceRole } from "./types";

export async function getUserWorkspaceRole(
  workspaceId: string,
  userId: string,
): Promise<WorkspaceRole> {
  const member = await db.query.workspaceMembersTable.findFirst({
    where: and(
      eq(workspaceMembersTable.workspaceId, workspaceId),
      eq(workspaceMembersTable.userId, userId),
    ),
    columns: { role: true },
  });

  return member ? member.role : "member";
}
