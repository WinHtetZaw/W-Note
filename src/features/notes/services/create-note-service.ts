import { fail, ok } from "@/lib/result";
import {
  CreateNoteInput,
  createNoteSchema,
} from "../schemas/create-note-schema";
import { requirePermission } from "@/lib/permissions";
import { insertNote } from "../server/mutations/insert-note";
import { ErrorReason } from "@/lib/errors";
import { checkPlanLimit } from "@/features/billing/services/check-plan-limit";
import { countNotes } from "../server/queries/count-notes";

export async function createNoteService(inputData: CreateNoteInput) {
  //========= Validating incoming data ========//
  const validateResult = createNoteSchema.safeParse(inputData);
  if (!validateResult.success) {
    return fail({
      reason: ErrorReason.InvalidInput,
      details: validateResult.error,
    });
  }
  const { workspaceId, folderId } = validateResult.data;

  //========== Auth and permisssion ==========//
  const [error, authData] = await requirePermission(workspaceId, "note:create");
  if (error) {
    return fail({ reason: error.reason });
  }
  const authorId = authData.user.id;

  //========== Plan Limit Check ==========//
  const noteCount = await countNotes(workspaceId);
  const quota = await checkPlanLimit(workspaceId, "notes", noteCount);
  if (!quota.allowed) {
    return fail({ reason: ErrorReason.PlanLimitReached });
  }

  //========== DB Process ==========//
  try {
    const note = await insertNote({ workspaceId, authorId, folderId });
    return ok(note);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
