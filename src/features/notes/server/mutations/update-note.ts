"use server";

import { notesTable, noteVersionsTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getNote } from "../queries/get-note";
import { createNoteVersion } from "../../services/create-note-version";
import { JSONContent } from "@tiptap/react";
import { getNoteForVersion } from "../queries/get-note-for-version";

export async function updateNote(
  // data: Pick<typeof notesTable.$inferInsert, "title" | "content">,
  data: { title?: string; content?: string | null },
  noteId: string,
  userId: string,
) {
  // const note = (await getNote(noteId)) as typeof notesTable.$inferSelect;

  const noteForVersion = await getNoteForVersion(noteId);
  const lastest = await db.query.noteVersionsTable.findFirst({
    columns: { version: true },
    where: eq(noteVersionsTable.noteId, noteId),
    orderBy: (table, { desc }) => [desc(table.version)],
  });

  const version = lastest?.version ?? 0 + 1;

  if (!noteForVersion) {
    return false;
  }

  // await createNoteVersion(note);

  // const [updated] = await db
  //   .update(notesTable)
  //   .set({ title: data.title, content: data.content })
  //   .where(eq(notesTable.id, noteId))
  //   .returning();

  const updated = await db.transaction(async (tx) => {
    await tx.insert(noteVersionsTable).values({
      noteId: noteForVersion.id,
      editedBy: userId,
      title: "noteForVersion.title",
      content: noteForVersion.content ?? "{}",
      version,
    });

    const updatedNote = await tx
      .update(notesTable)
      .set({ title: data.title, content: data.content })
      .where(eq(notesTable.id, noteId))
      .returning();

    return updatedNote;
  });

  // todo revalidate

  return updated;
}
