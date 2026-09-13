import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

type IncomingData = {
  workspaceId: string;
  userId: string;
};

export async function getMemberById(data: IncomingData) {
  "use cache";
  cacheTag(cacheTags.workspaceMembers(data.workspaceId));

  return db.query.workspaceMembersTable.findFirst({
    where: and(
      eq(workspaceMembersTable.workspaceId, data.workspaceId),
      eq(workspaceMembersTable.userId, data.userId),
    ),
    with: {
      user: true,
    },
  });
}
