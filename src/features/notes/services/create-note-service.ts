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
import { checkRateLimit } from "@/lib/ratelimit/check-rate-limit";

export async function createNoteService(inputData: CreateNoteInput) {
  // ─── Validate input ─────────────────────────────────────────────
  const validateResult = createNoteSchema.safeParse(inputData);
  if (!validateResult.success) {
    return fail({
      reason: ErrorReason.InvalidInput,
      details: validateResult.error,
    });
  }
  const { workspaceId, folderId } = validateResult.data;

  // ─── Authentication and Permisssion ───────────────────────────
  const [error, authData] = await requirePermission(workspaceId, "note:create");
  if (error) {
    return fail({ reason: error.reason });
  }
  const authorId = authData.user.id;

  // ─── Check Ratelimit ───────────────────────────
  const [limitError] = await checkRateLimit("create", `user:${authorId}`);
  if (limitError) {
    return fail({ reason: limitError.reason, details: limitError.details });
  }

  // ─── Check Quota ───────────────────────────
  const noteCount = await countNotes(workspaceId);
  const quota = await checkPlanLimit(workspaceId, "notes", noteCount);
  if (!quota.allowed) {
    return fail({ reason: ErrorReason.PlanLimitReached });
  }

  // ─── DB operation ───────────────────────────
  try {
    const note = await insertNote({ workspaceId, authorId, folderId });
    return ok(note);
  } catch (error) {
    return fail({ reason: ErrorReason.UnexpectedError, details: error });
  }
}
