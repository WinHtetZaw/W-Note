import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { foldersTable, notesTable, workspacesTable } from "@/db/schema";
import { checkPlanLimit } from "@/features/billing/services/check-plan-limit";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { insertFolder } from "./insert-folder";

type CreateFolderAtomicInput = {
  workspaceId: string;
  name: string;
  createdBy: string;
};

export async function createFolderAtomic(input: CreateFolderAtomicInput) {
  const { workspaceId, name, createdBy } = input;

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

    // Getting folder count
    const folderCount = await tx.$count(
      foldersTable,
      eq(foldersTable.workspaceId, workspaceId),
    );

    // Check plan limit
    const quota = await checkPlanLimit(workspaceId, "notes", folderCount);

    if (!quota.allowed) {
      return fail({ reason: ErrorReason.PlanLimitReached });
    }

    const inserted = await insertFolder(tx, {
      workspaceId,
      name,
      createdBy,
    });
    return ok(inserted);
  });
}
