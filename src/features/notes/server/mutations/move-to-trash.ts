import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function moveToTrash(noteId: string) {
  const result = await db
    .update(notesTable)
    .set({ deletedAt: new Date() })
    .where(eq(notesTable.id, noteId))
    .returning({ id: notesTable.id });

  return result.length > 0;
}
