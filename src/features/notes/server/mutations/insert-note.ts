import { db } from "@/db";
import { notesTable } from "@/db/schema";

export async function insertNote(
  workspaceId: string,
  authorId: string,
  folderId?: string | null,
) {
  if (folderId) {
    const folder = await db.query.foldersTable.findFirst({
      where: (table, { and, eq }) =>
        and(eq(table.id, folderId), eq(table.workspaceId, workspaceId)),
    });
    if (!folder) {
      // throw new Error("Invalid folder");
      return false;
    }
  }

  const [note] = await db
    .insert(notesTable)
    .values({
      workspaceId,
      folderId,
      title: "Untitled Note",
      authorId,
      content: "",
    })
    .returning({ id: notesTable.id });

  //todo revalidate

  return note;
}

// export async function insertNote(data: typeof notesTable.$inferInsert) {
//   const { workspaceId, folderId, title, content, authorId } = data;
//   const [note] = await db
//     .insert(notesTable)
//     .values({
//       workspaceId,
//       folderId,
//       title,
//       authorId,
//       content: content ?? "",
//     })
//     .returning();

//   //todo revalidate

//   return note;
// }
