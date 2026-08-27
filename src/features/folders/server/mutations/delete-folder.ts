import { db } from "@/db";
import { foldersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { RemoveFolder } from "../../schemas";

export async function deleteFolder(data: RemoveFolder) {
  const [deletedFolderId] = await db
    .delete(foldersTable)
    .where(
      and(
        eq(foldersTable.id, data.folderId),
        eq(foldersTable.workspaceId, data.workspaceId),
      ),
    )
    .returning({ id: foldersTable.id });

  return !!deletedFolderId;
}
