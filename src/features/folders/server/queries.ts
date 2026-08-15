import { eq } from "drizzle-orm";
import { db } from "@/db";
import { foldersTable, notesTable } from "@/db/schema";
import { cacheTag } from "next/cache";

export async function getFolder(folderId: string) {
  //! implement cache
  return db.query.foldersTable.findFirst({
    where: eq(foldersTable.id, folderId),
  });
}

export async function getFolders(workspaceId: string) {
  "use cache";
  cacheTag("trash");
  //! implement cache
  return db.query.foldersTable.findMany({
    where: eq(foldersTable.workspaceId, workspaceId),
    with: { notes: true },
    orderBy: (table, { asc }) => [asc(table.createdAt)],
  });
}

export type FolderswithNotes = NonNullable<
  Awaited<ReturnType<typeof getFolders>>
>;

// export async function getFoldersWithNotes(workspaceId: string) {
//   return db.query.foldersTable.findMany({
//     where: eq(foldersTable.workspaceId, workspaceId),
//     with: {
//       notes: true,
//     },
//     orderBy: (table, { asc }) => [asc(table.createdAt)],
//   });
// }

export async function getFolderNotes(folderId: string) {
  // !implement cache
  const folder = await db.query.foldersTable.findFirst({
    where: eq(foldersTable.id, folderId),
  });

  if (!folder) return null;

  return db.query.notesTable.findMany({
    where: eq(notesTable.folderId, folderId),
    orderBy: (table, { desc }) => [desc(table.updatedAt)],
  });
}
