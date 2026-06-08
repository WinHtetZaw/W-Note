import { db } from "@/db";
import { workspacesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteWorkspace(workspaceId: string) {
  const result = await db
    .delete(workspacesTable)
    .where(eq(workspacesTable.id, workspaceId))
    .returning({ id: workspacesTable.id });

  // ! revalidteTag for all related cache tags.
  return result.length > 0;
}
