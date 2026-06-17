import { db } from "@/db";
import { workspacesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getWorkspace(workspaceId: string) {
  // "use cache";
  // cacheTag(
  //   `workspace-${workspaceId}`, // specific workspace
  //   "workspaces", // table dependency
  //   "subscriptions", // related data
  // );

  return db.query.workspacesTable.findFirst({
    where: eq(workspacesTable.id, workspaceId),
    // with: {
    //   subscription: true,
    // },
  });
}

export type Workspace = NonNullable<Awaited<ReturnType<typeof getWorkspace>>>;
