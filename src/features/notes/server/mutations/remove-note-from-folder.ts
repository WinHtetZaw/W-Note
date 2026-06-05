import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function removeNoteFromFolder(noteId: string) {
  const result = await db
    .update(notesTable)
    .set({ folderId: null })
    .where(eq(notesTable.id, noteId))
    .returning({ id: notesTable.id });

  return result.length > 0;
}
