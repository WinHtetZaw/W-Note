import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { notesTable, workspacesTable } from "@/db/schema";
import { checkPlanLimit } from "@/features/billing/services/check-plan-limit";
import { ErrorReason } from "@/lib/errors";
import { insertNote } from "./insert-note";
import { fail, ok } from "@/lib/result";

type CreateNoteAtomicInput = {
  workspaceId: string;
  authorId: string;
  folderId?: string | null;
};

export async function createNoteAtomic(input: CreateNoteAtomicInput) {
  const { workspaceId, authorId, folderId } = input;

  try {
    return db.transaction(async (tx) => {
      // Serialize note creation for this workspace.
      const [workspace] = await tx
        .select({ id: workspacesTable.id })
        .from(workspacesTable)
        .where(eq(workspacesTable.id, workspaceId))
        .for("update");

      if (!workspace) {
        return fail({ reason: ErrorReason.WorkspaceNotFound });
      }

      // Only active notes count toward the plan limit.
      const noteCount = await tx.$count(
        notesTable,
        and(
          eq(notesTable.workspaceId, workspaceId),
          isNull(notesTable.deletedAt),
        ),
      );

      const quota = await checkPlanLimit(workspaceId, "notes", noteCount);

      if (!quota.allowed) {
        return fail({ reason: ErrorReason.PlanLimitReached });
      }

      const inserted = await insertNote(tx, {
        workspaceId,
        authorId,
        folderId,
      });
      return ok(inserted);
    });
  } catch (error) {
    return fail({ reason: ErrorReason.UnexpectedError, details: error });
  }
}
