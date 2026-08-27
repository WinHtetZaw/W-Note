import { db } from "@/db";
import { noteVersionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getNoteVersion = (noteId: string) => {
  return db.query.noteVersionsTable.findFirst({
    columns: { version: true },
    where: eq(noteVersionsTable.noteId, noteId),
    orderBy: (table, { desc }) => [desc(table.version)],
  });
};
