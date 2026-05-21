import { db } from "@/db";
import {
  subscriptionsTable,
  workspaceMembersTable,
  workspacesTable,
} from "@/db/schema";
import { CreateWorkspaceInput } from "../schemas/create-workspace-schema";
import { and, eq } from "drizzle-orm";
import {
  UpdateWorkspaceInput,
  updateWorkspaceSchema,
} from "../schemas/update-workspace-schema";

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

export async function updateWorkspace(validated: UpdateWorkspaceInput) {
  const result = await db
    .update(workspacesTable)
    .set({ name: validated.name })
    .where(eq(workspacesTable.id, validated.workspaceId))
    .returning();

  // ! revalidteTag for all related cache tags.

  return result.length > 0;
}

export async function deleteWorkspace(workspaceId: string) {
  const result = await db
    .delete(workspacesTable)
    .where(eq(workspacesTable.id, workspaceId))
    .returning({ id: workspacesTable.id });

  // ! revalidteTag for all related cache tags.

  return result.length > 0;
}

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
