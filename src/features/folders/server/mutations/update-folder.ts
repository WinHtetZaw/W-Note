import { db } from "@/db";
import { foldersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type UpdateFolder = {
  name: string;
  workspaceId: string;
  folderId: string;
};

export async function updateFolder(data: UpdateFolder) {
  const [updatedFolder] = await db
    .update(foldersTable)
    .set({ name: data.name })
    .where(
      and(
        eq(foldersTable.id, data.folderId),
        eq(foldersTable.workspaceId, data.workspaceId),
      ),
    )
    .returning();

  return updatedFolder;
}
