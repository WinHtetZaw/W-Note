import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { notesTable, noteVersionsTable } from "@/db/schema";
import { requireAuth } from "@/lib/permissions";

export async function createNoteVersion(note: typeof notesTable.$inferSelect) {
  const user = await requireAuth();

  const latest = await db.query.noteVersionsTable.findFirst({
    where: eq(noteVersionsTable.noteId, note.id),
    orderBy: (table, { desc }) => [desc(table.version)],
  });

  await db.insert(noteVersionsTable).values({
    noteId: note.id,
    editedBy: user.id,
    title: note.title,
    content: note.content,
    version: (latest?.version ?? 0) + 1,
  });
}
