import { db } from "@/db";
import { foldersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function insertFolder(data: typeof foldersTable.$inferInsert) {
  const [folder] = await db
    .insert(foldersTable)
    .values({
      workspaceId: data.workspaceId,
      name: data.name,
      createdBy: data.createdBy,
    })
    .returning();

  //! implement revalidate cache
  return folder;
}

export async function updateFolder(
  data: typeof foldersTable.$inferInsert & { folderId: string },
  folderId: string,
) {
  const result = await db
    .update(foldersTable)
    .set({ name: data.name })
    .where(eq(foldersTable.id, folderId))
    .returning({ id: foldersTable.id });

  //! implement revalidate cache
  return result.length > 0;
}

export async function deleteFolder(folderId: string) {
  const result = await db
    .delete(foldersTable)
    .where(eq(foldersTable.id, folderId))
    .returning({ id: foldersTable.id });

  //! implement revalidate cache
  return result.length > 0;
}
