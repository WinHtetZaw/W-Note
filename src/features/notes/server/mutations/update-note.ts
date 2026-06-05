"use server";

import { notesTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getNote } from "../queries/get-note";
import { createNoteVersion } from "../../services/create-note-version";

export async function updateNote(
  data: Partial<typeof notesTable.$inferInsert>,
  noteId: string,
) {
  const note = (await getNote(noteId)) as typeof notesTable.$inferSelect;

  await createNoteVersion(note);

  const [updated] = await db
    .update(notesTable)
    .set({ title: data.title, content: data.content })
    .where(eq(notesTable.id, noteId))
    .returning();

  // todo revalidate

  return updated;
}
