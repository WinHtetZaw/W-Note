import { notesTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getNoteForVersion } from "../queries/get-note-for-version";
import { getNoteVersion } from "../queries/get-note-version";
import { insertNoteVersion } from "../../services/insert-note-version";

type UpdateNoteInput = {
  noteId: string;
  userId: string;
  title: string;
  content: string | null;
};

export async function updateNote(data: UpdateNoteInput) {
  const { noteId, userId, title, content } = data;

  //========= Checking updating note is existed or not ========//
  const noteForVersion = await getNoteForVersion(noteId);
  if (!noteForVersion) {
    throw new Error("Note for version is not found");
  }

  const lastest = await getNoteVersion(noteId);
  const version = lastest?.version ?? 0 + 1;

  const dataForNoteVersion = {
    noteId: noteForVersion.id,
    editedBy: userId,
    title: noteForVersion.title,
    content: noteForVersion.content ?? "",
    version,
  };

  const updated = await db.transaction(async (tx) => {
    await insertNoteVersion(tx, dataForNoteVersion);

    const [updatedNote] = await tx
      .update(notesTable)
      .set({ title, content })
      .where(eq(notesTable.id, noteId))
      .returning();

    return updatedNote;
  });

  return updated;
}
