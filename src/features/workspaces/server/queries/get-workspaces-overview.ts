import { eq, sql, desc } from "drizzle-orm";

import { db } from "@/db";

import {
  foldersTable,
  notesTable,
  subscriptionsTable,
  workspaceMembersTable,
  workspacesTable,
} from "@/db/schema";

export async function getWorkspacesOverview(userId: string) {
  const workspaces = await db
    .select({
      id: workspacesTable.id,
      name: workspacesTable.name,
      role: workspaceMembersTable.role,
      createdAt: workspacesTable.createdAt,
      updatedAt: workspacesTable.updatedAt,
      plan: subscriptionsTable.plan,
      status: subscriptionsTable.status,

      memberCount: sql<number>`
        (
          select count(*)
          from ${workspaceMembersTable}
          where ${workspaceMembersTable.workspaceId} = ${workspacesTable.id}
        )
      `,

      noteCount: sql<number>`
        (
          select count(*)
          from ${notesTable}
          where ${notesTable.workspaceId} = ${workspacesTable.id}
        )
      `,

      folderCount: sql<number>`
        (
          select count(*)
          from ${foldersTable}
          where ${foldersTable.workspaceId} = ${workspacesTable.id}
        )
      `,
    })
    .from(workspaceMembersTable)
    .innerJoin(
      workspacesTable,
      eq(workspaceMembersTable.workspaceId, workspacesTable.id),
    )
    .innerJoin(
      subscriptionsTable,
      eq(subscriptionsTable.workspaceId, workspacesTable.id),
    )
    .where(eq(workspaceMembersTable.userId, userId))
    .orderBy(desc(workspacesTable.updatedAt));

  return workspaces;
}

export type WorkspaceOverview = NonNullable<
  Awaited<ReturnType<typeof getWorkspacesOverview>>
>;
