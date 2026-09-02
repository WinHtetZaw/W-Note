import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { requireWorkspaceAdmin } from "@/lib/permissions";
import { getInvitationById } from "../server/queries/get-invitation-by-id";
import { validateRevocableInvitation } from "./validate-revocable-invitation";
import { revokeInvitation } from "../server/mutations/revoke-invitation";

const schema = z.object({ invitationId: z.uuid(), workspaceId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function revokeWorkspaceInviteService(rawData: IncomingData) {
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { invitationId, workspaceId } = result.data;

  const [error] = await requireWorkspaceAdmin(workspaceId);
  if (error) return fail({ reason: error.reason });

  //========== DB Process ==========//
  try {
    const invitation = await getInvitationById(invitationId);
    if (!invitation) {
      return fail({ reason: ErrorReason.InvitationNotFound });
    }

    const [error] = validateRevocableInvitation(invitation);
    if (error) {
      return fail({ reason: error.reason });
    }

    const isRevoked = await revokeInvitation(invitation.id);

    return ok({ success: isRevoked });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
