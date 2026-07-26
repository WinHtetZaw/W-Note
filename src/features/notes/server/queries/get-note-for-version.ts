import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getNoteForVersion(noteId: string) {
  // todo implement data cache
  const note = await db.query.notesTable.findFirst({
    columns: {
      id: true,
      title: true,
      content: true,
    },
    where: eq(notesTable.id, noteId),
  });

  return note;
}

export type NoteForVersion = NonNullable<
  Awaited<ReturnType<typeof getNoteForVersion>>
>;
