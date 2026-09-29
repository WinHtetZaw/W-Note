import { db } from "@/db";
import { getTrashedNotes } from "../queries/get-trash-notes";
import { notesTable } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";

export const emptyTrash = async (workspaceId: string) => {
  const trashedNotes = await getTrashedNotes({ workspaceId });

  if (trashedNotes.length === 0) {
    throw new Error("Trashed notes already empty!");
  }

  const deletedNotes = await db
    .delete(notesTable)
    .where(
      and(
        eq(notesTable.workspaceId, workspaceId),
        isNotNull(notesTable.deletedAt),
      ),
    )
    .returning();

  return {
    deletedNoteCount: deletedNotes.length,
  };
};
