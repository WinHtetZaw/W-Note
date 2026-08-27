import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function moveToTrash(noteId: string) {
  const [updatedNote] = await db
    .update(notesTable)
    .set({ deletedAt: new Date() })
    .where(eq(notesTable.id, noteId))
    .returning({
      id: notesTable.id,
      folderId: notesTable.folderId,
      workspaceId: notesTable.workspaceId,
    });

  return updatedNote;
}
