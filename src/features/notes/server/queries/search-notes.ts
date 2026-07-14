import { and, desc, eq, ilike, isNull } from "drizzle-orm";
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
      isNull(notesTable.deletedAt),
      ilike(notesTable.title, `%${query}%`), // need to check squence of isNull and ilinke, which one is first for performance
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
