"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getInvitation } from "../queries/get-invitation";
import { validateInvitation } from "../../services/validate-invitation";
import { ensureEmailMatches } from "../../services/ensure-email-matches";
import { ensureNotWorkspaceMember } from "../../services/ensure-not-workspace-member";
import { acceptInvitation } from "../../services/accept-invitation";
import { ok, Result } from "@/lib/types";
import { getInvitationById } from "../queries/get-invitation-by-id";

export async function acceptWorkspaceInvite(
  // token: string,
  invitationId: string,
): Promise<Result<string>> {
  // Auth
  const session = await auth.api.getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const { email, id: userId } = session.user;

  // const invitation = await getInvitation(invitationId);
  const invitation = await getInvitationById(invitationId);
  if (!invitation) {
    throw new Error("Invitation not found.");
  }

  validateInvitation(invitation);

  ensureEmailMatches(invitation.email, email);

  await ensureNotWorkspaceMember(invitation.workspaceId, userId);

  await acceptInvitation({ invitation, userId });

  // todo revalidate cache
  //   revalidatePath(`/dashboard/w/${invitation.workspaceId}/members`);

  return ok(invitation.workspaceId);
}
