import { db } from "@/db";
import { workspacesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteWorkspace(workspaceId: string) {
  const [deletedId] = await db
    .delete(workspacesTable)
    .where(eq(workspacesTable.id, workspaceId))
    .returning({ id: workspacesTable.id });

  return !!deletedId;
}
