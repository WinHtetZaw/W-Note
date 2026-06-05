import { db } from "@/db";
import { notesTable, noteVersionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function restoreNoteVersion(versionId: string) {
  const version = await db.query.noteVersionsTable.findFirst({
    where: eq(noteVersionsTable.id, versionId),
  });

  if (!version) {
    throw new Error("Version not found");
  }

  const result = await db
    .update(notesTable)
    .set({
      title: version.title,
      content: version.content ?? "", // update noteVersionTable's content to notNull()
    })
    .where(eq(notesTable.id, version.noteId))
    .returning({ id: notesTable.id });

  return result.length > 0;
}
