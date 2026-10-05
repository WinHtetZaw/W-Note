import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";

export async function countNotes(workspaceId: string) {
  return db.$count(
    notesTable,
    and(eq(notesTable.workspaceId, workspaceId), isNull(notesTable.deletedAt)),
  );
}
