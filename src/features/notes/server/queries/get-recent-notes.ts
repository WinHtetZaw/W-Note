import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getRecentNotes(workspaceId: string, limit = 10) {
  return db.query.notesTable.findMany({
    where: eq(notesTable.workspaceId, workspaceId),
    limit,
    orderBy: (table, { desc }) => [desc(table.updatedAt)],
  });
}
