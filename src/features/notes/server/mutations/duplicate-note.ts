import { db } from "@/db";
import { getNote } from "../queries/get-note";
import { notesTable } from "@/db/schema";

export async function duplicateNote(noteId: string) {
  const note = await getNote(noteId);
  if (!note) {
    throw new Error("Not Found");
  }

  const [duplicated] = await db
    .insert(notesTable)
    .values({
      workspaceId: note.workspaceId,
      folderId: note.folderId,
      authorId: note.authorId,
      title: note.title + " (Copy)",
      content: note.content,
    })
    .returning();

  return duplicated;
}
