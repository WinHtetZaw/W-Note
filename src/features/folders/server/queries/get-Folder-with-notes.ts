import { db } from "@/db";
import { foldersTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { and, eq, ilike } from "drizzle-orm";
import { cacheTag } from "next/cache";

type IncomingData = {
  workspaceId: string;
  folderId: string;
  q?: string | null;
};

export async function getFolderWithNotes(data: IncomingData) {
  "use cache";
  cacheTag(cacheTags.folderNotes(data.folderId));

  return db.query.foldersTable.findFirst({
    where: and(
      eq(foldersTable.id, data.folderId),
      eq(foldersTable.workspaceId, data.workspaceId),
      data.q ? ilike(foldersTable.name, `%${data.q}%`) : undefined,
    ),
    with: {
      notes: {
        columns: { id: true, title: true, updatedAt: true, workspaceId: true },
      },
    },
  });
}
