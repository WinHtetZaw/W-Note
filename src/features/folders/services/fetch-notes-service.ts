import { getNotes } from "@/features/notes/server/queries/get-notes";
import { ErrorReason } from "@/lib/errors";
import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";

const schema = z.object({
  workspaceId: z.string(),
  q: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
});

type IncomingData = z.infer<typeof schema>;

export async function fetchNotesService(rawData: IncomingData) {
  // ─── Validate Input ────────────────────────────────────────
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  // ─── Authentication & Permission ────────────────────────────
  const [error] = await requireWorkspaceMember(result.data.workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }

  // ─── DB Operation ────────────────────────────
  try {
    const res = await getNotes(result.data);
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
