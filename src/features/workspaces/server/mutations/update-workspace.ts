import { db } from "@/db";
import { UpdateWorkspaceInput } from "../../schemas/update-workspace-schema";
import { workspacesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateWorkspace(data: UpdateWorkspaceInput) {
  const [updated] = await db
    .update(workspacesTable)
    .set({ name: data.name })
    .where(eq(workspacesTable.id, data.workspaceId))
    .returning();

  return updated;
}
