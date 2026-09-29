import { and, desc, eq, ilike, isNotNull } from "drizzle-orm";
import { db } from "@/db";
import { notesTable } from "@/db/schema/note-schema";
import { cacheTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";

type IncomingData = {
  workspaceId: string;
  q?: string;
  limit?: number;
};

export async function getTrashedNotes(data: IncomingData) {
  "use cache";
  cacheTag(cacheTags.workspaceNotes(data.workspaceId));

  const { workspaceId, q, limit } = data;

  return db.query.notesTable.findMany({
    where: and(
      eq(notesTable.workspaceId, workspaceId),
      isNotNull(notesTable.deletedAt),
      q ? ilike(notesTable.title, `%${q}%`) : undefined,
    ),

    orderBy: [desc(notesTable.deletedAt)],
    limit,
  });
}
