import { requirePermission } from "@/lib/permissions";
import {
  CreateFolderInput,
  createFolderSchema,
} from "../schemas/create-folder-schema";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import { createFolderAtomic } from "../server/mutations/create-folder-atomic";
import { checkRateLimit } from "@/lib/ratelimit/check-rate-limit";

export async function createFolderService(rawData: CreateFolderInput) {
  // ─── Validate Input ────────────────────────────────────────────────
  const validated = createFolderSchema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId, name } = validated.data;

  // ─── Check Authentication & Permission ─────────────────────────────
  const [authError, authData] = await requirePermission(
    workspaceId,
    "folder:create",
  );
  if (authError) {
    return fail({ reason: authError.reason });
  }
  const userId = authData.user.id;

  // ─── Check Ratelimit ───────────────────────────────────────────────
  const [limitError] = await checkRateLimit("create", `user:${userId}`);
  if (limitError) {
    return fail({ reason: limitError.reason, details: limitError.details });
  }

  // ─── DB Operation ───────────────────────────────────────────────────
  try {
    const [error, folder] = await createFolderAtomic({
      workspaceId,
      name,
      createdBy: userId,
    });

    if (error) return fail({ reason: error.reason });
    return ok(folder);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
