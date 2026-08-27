import { db } from "@/db";
import { foldersTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { and, eq, ilike } from "drizzle-orm";
import { cacheTag } from "next/cache";

type IncomingData = {
  workspaceId: string;
  q?: string;
};

export async function getFoldersWithNotes(data: IncomingData) {
  "use cache";
  cacheTag(cacheTags.workspaceFolders(data.workspaceId));

  return db.query.foldersTable.findMany({
    where: and(
      eq(foldersTable.workspaceId, data.workspaceId),
      data.q ? ilike(foldersTable.name, `%${data.q}%`) : undefined,
    ),
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
