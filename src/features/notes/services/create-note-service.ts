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
  const result = createNoteSchema.safeParse(inputData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, folderId } = result.data;

  //========== Auth and permisssion ==========//
  const [error, data] = await requirePermission(workspaceId, "note:create");
  if (error) {
    return fail({ reason: error.reason });
  }
  const authorId = data.user.id;

  //========== Plan Limit Check ==========//
  const noteCount = await countNotes(workspaceId);
  const limitREsult = await checkPlanLimit({
    workspaceId,
    resource: "notes",
    currentCount: noteCount,
  });
  if (!limitREsult.allowed) {
    return fail({ reason: ErrorReason.PlanLimitReached });
  }

  //========== DB mutation ==========//
  try {
    const note = await insertNote({ workspaceId, authorId, folderId });
    return ok(note);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
