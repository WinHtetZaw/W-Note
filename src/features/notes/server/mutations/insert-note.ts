import { and, eq } from "drizzle-orm";
import { foldersTable, notesTable } from "@/db/schema";
import { Transaction } from "@/db/types";

type InsertNoteData = {
  workspaceId: string;
  authorId: string;
  folderId?: string | null;
};

export async function insertNote(tx: Transaction, data: InsertNoteData) {
  const { workspaceId, authorId, folderId } = data;

  if (folderId) {
    const [folder] = await tx
      .select({ id: foldersTable.id })
      .from(foldersTable)
      .where(
        and(
          eq(foldersTable.id, folderId),
          eq(foldersTable.workspaceId, workspaceId),
        ),
      )
      .limit(1);

    if (!folder) {
      throw new Error("Folder not found");
    }
  }

  const [note] = await tx
    .insert(notesTable)
    .values({
      workspaceId,
      folderId,
      title: "New Note",
      authorId,
      content: "",
    })
    .returning();

  return note;
}
