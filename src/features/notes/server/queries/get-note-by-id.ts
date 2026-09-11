import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function getNoteById(data: IncomingData) {
  const { workspaceId, noteId } = data;

  return db.query.notesTable.findFirst({
    where: and(
      eq(notesTable.workspaceId, workspaceId),
      eq(notesTable.id, noteId),
    ),

    with: { folder: true, author: true },
  });
}

export type Note = NonNullable<Awaited<ReturnType<typeof getNoteById>>>;
