import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getMembers(workspaceId: string) {
  "use cache";
  cacheTag(cacheTags.workspaceMembers(workspaceId));

  return db.query.workspaceMembersTable.findMany({
    where: eq(workspaceMembersTable.workspaceId, workspaceId),
    with: {
      user: true,
    },
    orderBy: (table, { asc }) => [asc(table.joinedAt)],
  });
}
