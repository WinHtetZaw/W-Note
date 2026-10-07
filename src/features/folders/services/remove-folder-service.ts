import { requirePermission } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { deleteFolder } from "../server/mutations/delete-folder";
import { ErrorReason } from "@/lib/errors";
import { checkRateLimit } from "@/lib/ratelimit/check-rate-limit";
import z from "zod";

const schema = z.object({
  workspaceId: z.string(),
  folderId: z.string(),
});

type IncomingData = z.infer<typeof schema>;

export async function removeFolderService(rawData: IncomingData) {
  // ─── Validate Input ──────────────────────────────────────────
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId } = validated.data;

  // ─── Check Authentication & Permission ───────────────────────
  const [authError, authData] = await requirePermission(
    workspaceId,
    "folder:delete",
  );
  if (authError) {
    return fail({ reason: authError.reason });
  }

  // ─── Check Ratelimit ─────────────────────────────────────────
  const [limitError] = await checkRateLimit(
    "destructive",
    `user:${authData.user.id}`,
  );
  if (limitError) {
    return fail({ reason: limitError.reason, details: limitError.details });
  }

  // ─── Check Operation ──────────────────────────────────────────
  try {
    const isDeleted = await deleteFolder(validated.data);
    return ok({ success: isDeleted });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
