"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getInvitation } from "../queries/get-invitation";
import { validateInvitation } from "../../services/validate-invitation";
import { ensureEmailMatches } from "../../services/ensure-email-matches";
import { ensureNotWorkspaceMember } from "../../services/ensure-not-workspace-member";
import { acceptInvitation } from "../../services/accept-invitation";
import { ok, Result } from "@/lib/types";

export async function acceptWorkspaceInvite(
  token: string,
): Promise<Result<string>> {
  // Auth
  const session = await auth.api.getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const invitation = await getInvitation(token);
  if (!invitation) {
    throw new Error("Invitation not found.");
  }

  validateInvitation(invitation);

  ensureEmailMatches(invitation.email, session.user.email);

  await ensureNotWorkspaceMember(invitation.workspaceId, session.user.id);

  await acceptInvitation({
    invitation,
    userId: session.user.id,
  });

  // todo revalidate cache
  //   revalidatePath(`/dashboard/w/${invitation.workspaceId}/members`);

  return ok(invitation.workspaceId);
}
