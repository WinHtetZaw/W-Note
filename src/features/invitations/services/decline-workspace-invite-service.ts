import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { requireAuth } from "@/lib/permissions";
import { declineInvitation } from "../server/mutations/decline-invitation";

const schema = z.object({ invitationId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function declineWorkspaceInviteService(rawData: IncomingData) {
  // ─── Validate Inputs ───────────────────────────────────────
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({
      reason: ErrorReason.InvalidInput,
      details: validated.error,
    });
  }

  // ─── Check Authentication ──────────────────────────────────
  const [authError] = await requireAuth();
  if (authError) return fail({ reason: authError.reason });

  // ─── DB Operation ──────────────────────────────────────────
  try {
    const invitation = await declineInvitation(validated.data.invitationId);

    return ok(invitation);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
