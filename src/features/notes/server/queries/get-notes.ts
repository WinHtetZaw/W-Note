import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";

export async function getNotes(workspaceId: string, limit?: number) {
  return db.query.notesTable.findMany({
    where: and(
      eq(notesTable.workspaceId, workspaceId),
      isNull(notesTable.deletedAt),
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
