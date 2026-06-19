import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getNotes(workspaceId: string, limit?: number) {
  return db.query.notesTable.findMany({
    where: eq(notesTable.workspaceId, workspaceId),
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
