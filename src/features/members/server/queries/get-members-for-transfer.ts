import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { and, eq, not } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getMembersForTransfer(workspaceId: string) {
  "use cache";
  cacheTag(cacheTags.workspaceMembers(workspaceId));

  return db.query.workspaceMembersTable.findMany({
    where: and(
      eq(workspaceMembersTable.workspaceId, workspaceId),
      not(eq(workspaceMembersTable.role, "owner")),
    ),
    with: {
      user: true,
    },
    orderBy: (table, { asc }) => [asc(table.joinedAt)],
  });
}
