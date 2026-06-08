import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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
