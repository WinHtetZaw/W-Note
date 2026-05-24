import { eq } from "drizzle-orm";
import { db } from "@/db";
import { workspaceMembersTable, workspacesTable } from "@/db/schema";
import { cacheTag } from "next/cache";

export async function getUserWorkspaces(userId: string) {
  // "use cache";
  // cacheTag(
  //   "user-workspaces", // global fallback
  //   `user-${userId}`, // per-user precision
  //   "workspace-members", // table-level dependency
  //   "subscriptions", // related data
  // );

  return db.query.workspaceMembersTable.findMany({
    where: eq(workspaceMembersTable.userId, userId),
    with: {
      workspace: {
        with: {
          subscription: true,
        },
      },
    },
    orderBy: (table, { desc }) => [desc(table.joinedAt)],
  });
}

// export async function getWorkspaces(userId: string) {
//   return db.query.workspacesTable.findMany({
//     where: eq(workspacesTable.ownerId, userId),
//     with: {
//       subscription: true,
//       members: {
//         columns: { userId: true },
//       },
//       notes: {
//         columns: { id: true },
//       },
//       folders: {
//         columns: { id: true },
//       },
//     },
//     orderBy: (table, { desc }) => [desc(table.createdAt)],
//   });
// }

export async function getWorkspaceById(workspaceId: string) {
  // "use cache";
  // cacheTag(
  //   `workspace-${workspaceId}`, // specific workspace
  //   "workspaces", // table dependency
  //   "subscriptions", // related data
  // );

  return db.query.workspacesTable.findFirst({
    where: eq(workspacesTable.id, workspaceId),
    with: {
      subscription: true,
    },
  });
}

export async function getWorkspaceMembers(workspaceId: string) {
  // "use cache";
  // cacheTag(
  //   `workspace-${workspaceId}`, // workspace scope
  //   "workspace-members", // table dependency
  //   "users", // global user updates
  //   `workspace-users-${workspaceId}`, // scoped user updates (optional but powerful)
  // );
  // Note: "users" might be too broad e.g. if user updates their profile, it would invalidate all workspace member lists. But `workspace-users-${workspaceId}` only this workspace member list refreshes, conbine "users" with `workspace-users-${workspaceId}` can achieve a good balance between freshness and cache efficiency.

  return db.query.workspaceMembersTable.findMany({
    where: eq(workspaceMembersTable.workspaceId, workspaceId),
    with: {
      user: true,
    },
    orderBy: (table, { asc }) => [asc(table.joinedAt)],
  });
}
