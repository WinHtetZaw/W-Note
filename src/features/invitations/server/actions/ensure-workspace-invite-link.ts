"use server";

import { revalidatePath } from "next/cache";

import { requireWorkspaceAdmin } from "@/lib/permissions";

import { createInvitation } from "../mutations/create-invitation";

import { getInviteLink } from "../queries/get-invite-link";
import { generateInviteLink } from "../../services/generate-invite-link";
import { generateInvitationToken } from "../../services/generate-token";
import { getInvitationExpiration } from "../../services/get-invitation-expiration";
import { ok, Result } from "@/lib/types";
import { InvitationWithInviteLink } from "../../types";

export async function ensureWorkspaceInviteLink(
  workspaceId: string,
): Promise<Result<InvitationWithInviteLink>> {
  // Auth and Authz
  const { user } = await requireWorkspaceAdmin(workspaceId);

  // Response with the old link
  const existing = await getInviteLink(workspaceId);
  if (existing) {
    const inviteLink = generateInviteLink({ token: existing.token });
    return ok({ ...existing, inviteLink });
  }

  // Responese generate the new one
  const token = generateInvitationToken();
  const inviteLink = generateInviteLink({ token });
  const invitation = await createInvitation({
    workspaceId,
    invitedBy: user.id,
    email: "",
    role: "member",
    // type: "link",
    token,
    expiresAt: getInvitationExpiration(),
  });

  // todo revalidate cache
  //   revalidatePath(`/dashboard/w/${workspaceId}/members`);

  return ok({ ...invitation, inviteLink });
}
