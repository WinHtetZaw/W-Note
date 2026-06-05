import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function moveNoteToFolder(noteId: string, folderId: string) {
  const result = await db
    .update(notesTable)
    .set({ folderId })
    .where(eq(notesTable.id, noteId))
    .returning({ id: notesTable.id });

  return result.length > 0;
}
