import { db } from "@/db";
import { CreateWorkspaceInput } from "../../schemas/create-workspace-schema";
import {
  subscriptionsTable,
  workspaceMembersTable,
  workspacesTable,
} from "@/db/schema";

export async function insertWorkspace(
  validated: CreateWorkspaceInput,
  userId: string,
) {
  const workspace = await db.transaction(async (tx) => {
    const [createdWorkspace] = await tx
      .insert(workspacesTable)
      .values({
        name: validated.name,
        ownerId: userId,
      })
      .returning();

    await tx.insert(workspaceMembersTable).values({
      workspaceId: createdWorkspace.id,
      userId,
      role: "owner",
    });

    await tx.insert(subscriptionsTable).values({
      workspaceId: createdWorkspace.id,
      plan: "free",
      status: "active",
    });

    return createdWorkspace;
  });

  // ! revalidteTag for all related cache tags.

  return workspace;
}
