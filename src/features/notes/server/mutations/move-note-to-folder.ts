import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type IncomingData = { noteId: string; folderId: string };

export async function moveNoteToFolder(data: IncomingData) {
  const { folderId, noteId } = data;
  const [note] = await db
    .update(notesTable)
    .set({ folderId })
    .where(eq(notesTable.id, noteId))
    .returning({
      id: notesTable.id,
      workspaceId: notesTable.workspaceId,
      folderId: notesTable.folderId,
    });

  return note;
}
