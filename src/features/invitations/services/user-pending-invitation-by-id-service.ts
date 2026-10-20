import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import { requireAuth } from "@/lib/permissions";
import { getUserPendingInvitationById } from "../server/queries/get-user-pending-invitation-by-id";
import z from "zod";
import { hashInvitationToken } from "./hash-invitation-token";

const schema = z.object({ token: z.string() });

type IncomingData = z.infer<typeof schema>;

export async function userPendingInvitationByIdService(rawData: IncomingData) {
  // ─── Validate Input ───────────────────────────────
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }

  // ─── Check Authentication ──────────────────────────
  const [authError, authData] = await requireAuth();
  if (authError) {
    return fail({ reason: authError.reason });
  }

  const hashedToken = hashInvitationToken(validated.data.token);
  // ─── DB Operation ───────────────────────────────────
  try {
    const invitation = await getUserPendingInvitationById(hashedToken);

    if (!invitation) {
      return fail({ reason: ErrorReason.InvitationNotFound });
    }

    return ok({ userId: authData.id, invitation });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
