import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { getNoteById } from "../queries/get-note-by-id";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function duplicateNote(data: IncomingData) {
  const { workspaceId, noteId } = data;
  const note = await getNoteById({ workspaceId, noteId });

  if (!note) {
    throw new Error("Note not found.");
  }

  const title = note.title.includes("(Copy)")
    ? note.title
    : note.title + " (Copy)";

  const [duplicated] = await db
    .insert(notesTable)
    .values({
      workspaceId: note.workspaceId,
      folderId: note.folderId,
      authorId: note.authorId,
      title,
      content: note.content,
    })
    .returning();

  return duplicated;
}
