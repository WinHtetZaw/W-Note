import { fail, ok } from "@/lib/result";
import { UpdateFolderInput, updateFolderSchema } from "../schemas";
import { requirePermission } from "@/lib/permissions";
import { updateFolder } from "../server/mutations/update-folder";
import { ErrorReason } from "@/lib/errors";
import { checkRateLimit } from "@/lib/ratelimit/check-rate-limit";

export async function renameFolderService(rawData: UpdateFolderInput) {
  // ─── Validate Input ───────────────────────────────────────────────
  const result = updateFolderSchema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId } = result.data;

  // ─── Check Authentication & Permission ────────────────────────────
  const [authError, authData] = await requirePermission(
    workspaceId,
    "folder:update",
  );
  if (authError) {
    return fail({ reason: authError.reason });
  }

  // ─── Check Ratelimit ───────────────────────────────────────────────
  const [limitError] = await checkRateLimit(
    "mutation",
    `user:${authData.user.id}`,
  );
  if (limitError) {
    return fail({ reason: limitError.reason, details: limitError.details });
  }

  // ─── DB Operation ─────────────────────────────────────────────────
  try {
    const folder = await updateFolder(result.data);
    return ok(folder);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
