import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { requireWorkspaceAdmin } from "@/lib/permissions";
import { getInvitationById } from "../server/queries/get-invitation-by-id";
import { validateRevocableInvitation } from "./validate-revocable-invitation";
import { generateInvitationToken } from "./generate-token";
import { hashInvitationToken } from "./hash-invitation-token";
import { getInvitationExpiration } from "./get-invitation-expiration";
import { updateInvitation } from "../server/mutations/update-invitation";
import { generateInviteLink } from "./generate-invite-link";
import { getWorkspace } from "@/features/workspaces/server/queries/get-workspace";
import { sendInvitationEmail } from "./send-invitation-email";
import { formatExpiryInDays } from "@/utils";

const schema = z.object({ invitationId: z.uuid(), workspaceId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function resendWorkspaceInviteService(rawData: IncomingData) {
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { invitationId, workspaceId } = result.data;

  const [error, authData] = await requireWorkspaceAdmin(workspaceId);
  if (error) return fail({ reason: error.reason });
  const { name: inviterName, email } = authData.user;

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

    const token = generateInvitationToken();
    const tokenHash = hashInvitationToken(token);
    const expiresAt = getInvitationExpiration();
    const isUpdated = await updateInvitation({
      invitationId: invitation.id,
      tokenHash,
      expiresAt,
    });

    const workspace = await getWorkspace(invitation.workspaceId);
    if (!workspace) {
      return fail({ reason: ErrorReason.WorkspaceNotFound });
    }
    const workspaceName = workspace.name;

    const inviteLink = generateInviteLink({ token });
    const expiresIn = formatExpiryInDays(expiresAt);
    const emailResult = await sendInvitationEmail({
      to: email,
      workspaceName,
      inviterName,
      role: invitation.role,
      invitationLink: inviteLink,
      expiresIn,
    });

    if (!emailResult.success) {
      // logger.error(emailResult.error);
      fail({ reason: ErrorReason.EmailDoesNotSent });
    }

    return ok({ success: isUpdated, emailSent: true });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
