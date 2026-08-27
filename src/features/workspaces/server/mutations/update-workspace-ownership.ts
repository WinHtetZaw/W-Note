import { db } from "@/db";
import { workspaceMembersTable, workspacesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type WorkspaceOwnerShip = {
  workspaceId: string;
  newOwnerId: string;
  userId: string;
};

export async function updateWorkspaceOwnership(data: WorkspaceOwnerShip) {
  const { workspaceId, newOwnerId, userId } = data;
  const result = await db.transaction(async (tx) => {
    const [updatedWorkspaceId] = await tx
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

    return !!updatedWorkspaceId;
  });

  return result;
}
