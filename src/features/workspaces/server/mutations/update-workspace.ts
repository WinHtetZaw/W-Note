import { db } from "@/db";
import { UpdateWorkspaceInput } from "../../schemas/update-workspace-schema";
import { workspacesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateWorkspace(validated: UpdateWorkspaceInput) {
  const result = await db
    .update(workspacesTable)
    .set({ name: validated.name })
    .where(eq(workspacesTable.id, validated.workspaceId))
    .returning();

  // ! revalidteTag for all related cache tags.

  return result.length > 0;
}
