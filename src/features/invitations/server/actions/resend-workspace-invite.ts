"use server";

import { revalidatePath } from "next/cache";
import { requireWorkspaceAdmin } from "@/lib/permissions";
import { getInvitationById } from "../queries/get-invitation-by-id";
import { updateInvitation } from "../mutations/update-invitation";
import { validateRevocableInvitation } from "../../services/validate-revocable-invitation";
import { generateInvitationToken } from "../../services/generate-token";
import { getInvitationExpiration } from "../../services/get-invitation-expiration";
import { generateInviteLink } from "../../services/generate-invite-link";
import { fail, ok, Result } from "@/lib/types";
import { InvitationWithInviteLink } from "../../types";
import { hashInvitationToken } from "../../services/hash-invitation-token";

// import { sendInvitationEmail } from "../services/send-invitation-email";

export async function resendWorkspaceInvite(
  invitationId: string,
): Promise<Result<InvitationWithInviteLink>> {
  const invitation = await getInvitationById(invitationId);
  if (!invitation) return fail("Invitation not found.");

  // Auth & Authz
  await requireWorkspaceAdmin(invitation.workspaceId);

  validateRevocableInvitation(invitation);

  const token = generateInvitationToken();
  const tokenHash = hashInvitationToken(token);
  const expiresAt = getInvitationExpiration();
  const updatedInvitation = await updateInvitation(invitation.id, {
    tokenHash,
    expiresAt,
  });

  const inviteLink = generateInviteLink({ token });

  /**
   * todo Later
   */
  // await sendInvitationEmail({
  //   email: invitation.email!,
  //   inviteLink,
  //   workspaceName: "...",
  //   inviterName: "...",
  // });

  // todo implement revalidate cache
  //   revalidatePath(`/dashboard/w/${invitation.workspaceId}/members`);

  return ok({ ...updatedInvitation, inviteLink });
}
