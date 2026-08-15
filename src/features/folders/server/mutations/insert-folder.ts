import { db } from "@/db";
import { foldersTable } from "@/db/schema";

export async function insertFolder(data: typeof foldersTable.$inferInsert) {
  const { workspaceId, name, createdBy } = data;

  const [folder] = await db
    .insert(foldersTable)
    .values({ workspaceId, name, createdBy })
    .returning();

  return folder;
}
