import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { and, eq, ilike, isNull } from "drizzle-orm";
import { cacheTag } from "next/cache";

type IncomingData = {
  workspaceId: string;
  q?: string;
  limit?: number;
};

export async function getNotes(data: IncomingData) {
  "use cache";
  cacheTag(cacheTags.workspaceNotes(data.workspaceId));

  const { workspaceId, q, limit } = data;
  return db.query.notesTable.findMany({
    where: and(
      eq(notesTable.workspaceId, workspaceId),
      isNull(notesTable.deletedAt),
      q ? ilike(notesTable.title, `%${q}%`) : undefined,
    ),
    with: {
      folder: {
        columns: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: (table, { desc }) => [desc(table.updatedAt)],
    limit,
  });
}

export type Notes = NonNullable<Awaited<ReturnType<typeof getNotes>>>;
