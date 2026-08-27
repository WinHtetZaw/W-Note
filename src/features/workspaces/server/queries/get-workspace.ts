import { db } from "@/db";
import { workspacesTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getWorkspace(workspaceId: string) {
  "use cache";
  cacheTag(cacheTags.workspace(workspaceId));

  return db.query.workspacesTable.findFirst({
    where: eq(workspacesTable.id, workspaceId),
    // with: {
    //   subscription: true,
    // },
  });
}
