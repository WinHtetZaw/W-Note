import { db } from "@/db";
import { workspaceMembersTable, workspacesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function updateWorkspaceOwnership(
  workspaceId: string,
  newOwnerId: string,
  userId: string,
) {
  const result = await db.transaction(async (tx) => {
    const updatedWorkspace = await tx
      .update(workspacesTable)
      .set({
        ownerId: newOwnerId,
      })
      .where(eq(workspacesTable.id, workspaceId))
      .returning({ id: workspacesTable.id });

    await tx
      .update(workspaceMembersTable)
      .set({ role: "owner" })
      .where(
        and(
          eq(workspaceMembersTable.workspaceId, workspaceId),
          eq(workspaceMembersTable.userId, newOwnerId),
        ),
      );

    await tx
      .update(workspaceMembersTable)
      .set({ role: "admin" })
      .where(
        and(
          eq(workspaceMembersTable.workspaceId, workspaceId),
          eq(workspaceMembersTable.userId, userId),
        ),
      );

    return updatedWorkspace.length > 0;
  });

  // ! revalidteTag for all related cache tags.

  return result;
}
