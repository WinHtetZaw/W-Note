import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function deleteNote(data: IncomingData) {
  const { workspaceId, noteId } = data;

  const [deletedId] = await db
    .delete(notesTable)
    .where(
      and(eq(notesTable.workspaceId, workspaceId), eq(notesTable.id, noteId)),
    )
    .returning({ id: notesTable.id });

  return !!deletedId;
}
