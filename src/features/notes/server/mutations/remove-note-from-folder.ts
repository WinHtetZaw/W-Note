import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function removeNoteFromFolder(noteId: string) {
  const [updatedNote] = await db
    .update(notesTable)
    .set({ folderId: null })
    .where(eq(notesTable.id, noteId))
    .returning({ id: notesTable.id, workspaceId: notesTable.workspaceId });

  return updatedNote;
}
