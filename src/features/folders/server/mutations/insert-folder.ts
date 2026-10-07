import { foldersTable } from "@/db/schema";
import { Transaction } from "@/db/types";

export async function insertFolder(
  tx: Transaction,
  data: typeof foldersTable.$inferInsert,
) {
  const { workspaceId, name, createdBy } = data;

  const [folder] = await tx
    .insert(foldersTable)
    .values({ workspaceId, name, createdBy })
    .returning();

  return folder;
}
