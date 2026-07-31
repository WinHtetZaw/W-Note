"use server";

import { revalidatePath } from "next/cache";
import { requireWorkspaceAdmin } from "@/lib/permissions";
import { getInvitationById } from "../queries/get-invitation-by-id";
import { validateRevocableInvitation } from "../../services/validate-revocable-invitation";
import { revokeInvitation } from "../mutations/revoke-invitation";
import { fail, ok, Result } from "@/lib/types";
import { Invitation } from "../../types";

export async function revokeWorkspaceInvite(
  invitationId: string,
): Promise<Result<Invitation>> {
  const invitation = await getInvitationById(invitationId);

  if (!invitation) return fail("Invitation not found.");

  await requireWorkspaceAdmin(invitation.workspaceId);

  validateRevocableInvitation(invitation);

  const revokedInvitation = await revokeInvitation(invitationId);

  revalidatePath(`/dashboard/w/${invitation.workspaceId}/members`);

  return ok(revokedInvitation);
}
