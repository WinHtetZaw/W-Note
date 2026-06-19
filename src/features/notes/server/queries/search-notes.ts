import { and, desc, eq, ilike } from "drizzle-orm";
import { db } from "@/db";
import { notesTable } from "@/db/schema";

export async function searchNotes(
  workspaceId: string,
  query: string,
  // limit = 20,
) {
  return db.query.notesTable.findMany({
    where: and(
      eq(notesTable.workspaceId, workspaceId),
      ilike(notesTable.title, `%${query}%`),
    ),
    // columns: {
    //   id: true,
    //   title: true,
    //   folderId: true,
    //   updatedAt: true,
    //   content: true,
    // },
    with: {
      folder: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: (table) => [desc(table.updatedAt)],
    limit: 20,
  });
}

export type SearchNotes = NonNullable<Awaited<ReturnType<typeof searchNotes>>>;
