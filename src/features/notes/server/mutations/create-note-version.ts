import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import { getNoteForVersion } from "../queries/get-note-for-version";
import { getNoteVersion } from "../queries/get-note-version";
import { insertNoteVersion } from "../../services/insert-note-version";

type CreateNoteVersionInput = {
  noteId: string;
  userId: string;
};

export async function createNoteVersion({
  noteId,
  userId,
}: CreateNoteVersionInput) {
  return db.transaction(async (tx) => {
    const note = await getNoteForVersion(noteId);

    if (!note) {
      throw new Error("Note not found");
    }

    const latest = await getNoteVersion(noteId);

    // Parentheses are important here.
    const version = (latest?.version ?? 0) + 1;

    await insertNoteVersion(tx, {
      noteId: note.id,
      editedBy: userId,
      title: note.title,
      content: note.content ?? "",
      version,
    });

    return { version };
  });
}
