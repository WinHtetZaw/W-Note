import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type IncomingData = {
  noteId: string;
  workspaceId: string;
};

export async function permanentlyDeleteNote(data: IncomingData) {
  const { noteId, workspaceId } = data;

  const [deletedNote] = await db
    .delete(notesTable)
    .where(
      and(eq(notesTable.id, noteId), eq(notesTable.workspaceId, workspaceId)),
    )
    .returning({
      id: notesTable.id,
      folderId: notesTable.folderId,
      workspaceId: notesTable.workspaceId,
    });

  return deletedNote;
}
