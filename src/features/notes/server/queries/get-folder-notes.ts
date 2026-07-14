import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getFolderNotes(workspaceId: string, folderId: string) {
  return db.query.notesTable.findMany({
    where: and(
      eq(notesTable.workspaceId, workspaceId),
      eq(notesTable.folderId, folderId),
    ),
  });
}

export type FolderNote = Awaited<ReturnType<typeof getFolderNotes>>[number];
