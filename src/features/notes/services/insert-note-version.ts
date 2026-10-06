import { noteVersionsTable } from "@/db/schema";
import { Transaction } from "@/db/types";

type InsertNoteVersion = Omit<
  typeof noteVersionsTable.$inferInsert,
  "id" | "createdAt"
>;

export async function insertNoteVersion(
  tx: Transaction,
  data: InsertNoteVersion,
) {
  const [noteVersion] = await tx
    .insert(noteVersionsTable)
    .values(data)
    .returning();

  return noteVersion;
}
