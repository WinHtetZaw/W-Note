import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getNote(noteId: string) {
  // todo implement data cache
  const note = await db.query.notesTable.findFirst({
    where: eq(notesTable.id, noteId),
    with: { folder: true, author: true },
  });

  return note;
}

export type Note = NonNullable<Awaited<ReturnType<typeof getNote>>>;
