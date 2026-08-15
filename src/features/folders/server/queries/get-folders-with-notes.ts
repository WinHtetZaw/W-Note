import { db } from "@/db";
import { foldersTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getFoldersWithNotes(workspaceId: string) {
  // Caching
  "use cache";
  // cacheTag(cacheTags.workspaceFolders(workspaceId));
  cacheTag("folders");

  // Quering Database
  return db.query.foldersTable.findMany({
    where: eq(foldersTable.workspaceId, workspaceId),
    columns: {
      id: true,
      name: true,
      updatedAt: true,
      workspaceId: true,
    },
    with: { notes: { columns: { id: true, title: true, updatedAt: true } } },
    orderBy: (table, { asc }) => [asc(table.createdAt)],
  });
}

export type FolderNotesView = NonNullable<
  Awaited<ReturnType<typeof getFoldersWithNotes>>
>[number];
