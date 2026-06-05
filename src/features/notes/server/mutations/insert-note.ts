import { db } from "@/db";
import { notesTable } from "@/db/schema";

export async function insertNote(data: typeof notesTable.$inferInsert) {
  const { workspaceId, folderId, title, content, authorId } = data;
  const [note] = await db
    .insert(notesTable)
    .values({
      workspaceId,
      folderId,
      title,
      authorId,
      content: content ?? "",
    })
    .returning();

  //todo revalidate

  return note;
}
