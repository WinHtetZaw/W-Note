import { db } from "@/db";
import {
  foldersTable,
  notesTable,
  workspaceMembersTable,
  workspacesTable,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// export async function getWorkspaceOverview(workspaceId: string) {
//   const [workspace] = await db
//     .select({
//       id: workspacesTable.id,
//       name: workspacesTable.name,

//       memberCount: sql<number>`
//         (
//           select count(*)
//           from ${workspaceMembersTable}
//           where ${workspaceMembersTable.workspaceId} = ${workspacesTable.id}
//         )
//       `,

//       noteCount: sql<number>`
//         (
//           select count(*)
//           from ${notesTable}
//           where ${notesTable.workspaceId} = ${workspacesTable.id}
//         )
//       `,

//       folderCount: sql<number>`
//         (
//           select count(*)
//           from ${foldersTable}
//           where ${foldersTable.workspaceId} = ${workspacesTable.id}
//         )
//       `,
//     })
//     .from(workspacesTable)
//     .where(eq(workspacesTable.id, workspaceId));

//   if (!workspace) {
//     throw new Error("Workspace not found");
//   }

//   return workspace;
// }

export async function getWorkspaceOverview(workspaceId: string) {
  const workspace = await db.query.workspacesTable.findFirst({
    where: eq(workspacesTable.id, workspaceId),
    columns: { id: true, name: true },
  });

  if (!workspace) return null;

  const [memberCount, noteCount, folderCount] = await Promise.all([
    db.$count(
      workspaceMembersTable,
      eq(workspaceMembersTable.workspaceId, workspaceId),
    ),
    db.$count(notesTable, eq(notesTable.workspaceId, workspaceId)),
    db.$count(foldersTable, eq(foldersTable.workspaceId, workspaceId)),
  ]);

  return {
    ...workspace,
    memberCount,
    noteCount,
    folderCount,
  };
}

export type WorkspaceOverview = NonNullable<
  Awaited<ReturnType<typeof getWorkspaceOverview>>
>;
