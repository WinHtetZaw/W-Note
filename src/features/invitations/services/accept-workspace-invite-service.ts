import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { requireAuth } from "@/lib/permissions";
import { getInvitationById } from "../server/queries/get-invitation-by-id";
import { validateInvitation } from "./validate-invitation";
import { ensureEmailMatches } from "./ensure-email-matches";
import { ensureNotWorkspaceMember } from "./ensure-not-workspace-member";
import { acceptInvitation } from "../server/mutations/accept-invitation";

const schema = z.object({ invitationId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function acceptWorkspaceInviteService(rawData: IncomingData) {
  const result = schema.safeParse(rawData);

  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const invitationId = result.data.invitationId;

  const [error, authData] = await requireAuth();
  if (error) return fail({ reason: error.reason });
  const { id: userId, email } = authData;

  //========== DB Process ==========//
  try {
    const invitation = await getInvitationById(invitationId);

    if (!invitation) {
      return fail({ reason: ErrorReason.InvitationNotFound });
    }

    validateInvitation(invitation);

    ensureEmailMatches(invitation.email, email);

    await ensureNotWorkspaceMember(invitation.workspaceId, userId);

    const member = await acceptInvitation({ invitation, userId });

    return ok(member);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
