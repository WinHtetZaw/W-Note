import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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
