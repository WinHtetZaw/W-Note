import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";

type IncomingData = {
  noteId: string;
  workspaceId: string;
};

export async function restoreNote(data: IncomingData) {
  const { noteId, workspaceId } = data;

  const [updatedNote] = await db
    .update(notesTable)
    .set({ deletedAt: null })
    .where(
      and(
        eq(notesTable.id, noteId),
        eq(notesTable.workspaceId, workspaceId),
        isNotNull(notesTable.deletedAt),
      ),
    )
    .returning({
      id: notesTable.id,
      folderId: notesTable.folderId,
      workspaceId: notesTable.workspaceId,
    });

  return updatedNote;
}
