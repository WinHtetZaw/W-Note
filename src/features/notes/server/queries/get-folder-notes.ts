import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getFolderNotes(workspaceId: string, folderId: string) {
  // "use cache";
  // cacheTag(cacheTags.folderNotes(folderId));

  return db.query.notesTable.findMany({
    where: and(
      eq(notesTable.workspaceId, workspaceId),
      eq(notesTable.folderId, folderId),
    ),
  });
}

export type FolderNote = Awaited<ReturnType<typeof getFolderNotes>>[number];
