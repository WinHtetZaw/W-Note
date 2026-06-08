import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function deleteWorkspaceMember(
  workspaceId: string,
  userId: string,
) {
  const result = await db
    .delete(workspaceMembersTable)
    .where(
      and(
        eq(workspaceMembersTable.workspaceId, workspaceId),
        eq(workspaceMembersTable.userId, userId),
      ),
    )
    .returning({ id: workspaceMembersTable.workspaceId });

  // ! revalidteTag for all related cache tags.

  return result.length > 0;
}
