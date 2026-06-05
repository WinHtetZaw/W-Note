import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getNotes(workspaceId: string) {
  return db.query.notesTable.findMany({
    where: eq(notesTable.workspaceId, workspaceId),
    with: { folder: true },
    orderBy: (table, { desc }) => [desc(table.updatedAt)],
  });
}
