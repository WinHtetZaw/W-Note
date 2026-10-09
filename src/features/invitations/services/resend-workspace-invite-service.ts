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
import { formatExpiryInDays } from "@/utils/formatting";

const schema = z.object({ invitationId: z.uuid(), workspaceId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function resendWorkspaceInviteService(rawData: IncomingData) {
  // ─── Validate Input ────────────────────────────────────────────────
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { invitationId, workspaceId } = validated.data;

  // ─── Check Authentication & Permission ────────────────────────────────────────────────
  const [authError, authData] = await requireWorkspaceAdmin(workspaceId);
  if (authError) return fail({ reason: authError.reason });

  try {
    const invitation = await getInvitationById({ workspaceId, invitationId });
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
      status: "pending",
      tokenHash,
      expiresAt,
    });

    const workspace = await getWorkspace(invitation.workspaceId);
    if (!workspace) {
      return fail({ reason: ErrorReason.WorkspaceNotFound });
    }
    const workspaceName = workspace.name;

    const inviteLink = generateInviteLink(invitation.id);

    const expiresIn = formatExpiryInDays(expiresAt);
    const emailResult = await sendInvitationEmail({
      to: invitation.email,
      workspaceName,
      inviterName: authData.user.name,
      role: invitation.role,
      invitationLink: inviteLink,
      expiresIn,
    });

    if (!emailResult.success) {
      return fail({ reason: ErrorReason.EmailDoesNotSent });
    }

    return ok({ success: isUpdated, emailSent: true });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
