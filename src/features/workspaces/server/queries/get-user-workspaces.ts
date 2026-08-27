import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getUserWorkspaces(userId: string) {
  // "use cache";
  // cacheTag(cacheTags.userWorkspaces(userId));

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
