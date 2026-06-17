import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getNotes(workspaceId: string, limit?: number) {
  return db.query.notesTable.findMany({
    where: eq(notesTable.workspaceId, workspaceId),
    // with: { folder: true },
    orderBy: (table, { desc }) => [desc(table.updatedAt)],
    limit,
  });
}

export type Notes = Awaited<ReturnType<typeof getNotes>>;
