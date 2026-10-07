import { fail, ok } from "@/lib/result";
import {
  CreateNoteInput,
  createNoteSchema,
} from "../schemas/create-note-schema";
import { requirePermission } from "@/lib/permissions";
import { ErrorReason } from "@/lib/errors";
import { checkRateLimit } from "@/lib/ratelimit/check-rate-limit";
import { createNoteAtomic } from "../server/mutations/create-note-atomic";

export async function createNoteService(rawData: CreateNoteInput) {
  // ─── Validate input ─────────────────────────────────────────────
  const validateResult = createNoteSchema.safeParse(rawData);
  if (!validateResult.success) {
    return fail({
      reason: ErrorReason.InvalidInput,
      details: validateResult.error,
    });
  }
  const { workspaceId, folderId } = validateResult.data;

  // ─── Authentication and Permisssion ───────────────────────────
  const [authError, authData] = await requirePermission(
    workspaceId,
    "note:create",
  );
  if (authError) {
    return fail({ reason: authError.reason });
  }
  const authorId = authData.user.id;

  // ─── Check Ratelimit ───────────────────────────
  const [limitError] = await checkRateLimit("create", `user:${authorId}`);
  if (limitError) {
    return fail({ reason: limitError.reason, details: limitError.details });
  }

  // ─── Creating Note ───────────────────────────
  try {
    const data = { workspaceId, authorId, folderId };

    const [error, note] = await createNoteAtomic(data);

    if (error) return fail({ reason: error.reason });

    return ok(note);
  } catch (error) {
    return fail({ reason: ErrorReason.UnexpectedError, details: error });
  }
}
