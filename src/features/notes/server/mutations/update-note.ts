import { notesTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

type UpdateNoteInput = {
  noteId: string;
  userId: string;
  title: string;
  content: string | null;
};

export async function updateNote(data: UpdateNoteInput) {
  const { noteId, title, content } = data;

  const [updatedNote] = await db
    .update(notesTable)
    .set({
      title,
      content,
      updatedAt: new Date(),
    })
    .where(eq(notesTable.id, noteId))
    .returning();

  if (!updatedNote) {
    throw new Error("Note not found");
  }

  return updatedNote;
}
