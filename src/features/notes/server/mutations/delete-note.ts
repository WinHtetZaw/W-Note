import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteNote(noteId: string) {
  const result = await db
    .delete(notesTable)
    .where(eq(notesTable.id, noteId))
    .returning({ id: notesTable.id });

  // todo revalidate

  return result.length > 0;
}
