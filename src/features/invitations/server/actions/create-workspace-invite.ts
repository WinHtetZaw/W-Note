"use server";

import { revalidatePath } from "next/cache";
import { requireWorkspaceAdmin } from "@/lib/permissions";

import { createInvitation } from "../mutations/create-invitation";
import { fail, ok, Result } from "@/lib/types";
import { getInvitationByEmail } from "../queries/get-invitation-by-email";
import { sendInvitationEmail } from "../../services/send-invitation-email";
import { generateInviteLink } from "../../services/generate-invite-link";
import { generateInvitationToken } from "../../services/generate-token";
import { getInvitationExpiration } from "../../services/get-invitation-expiration";
import { Invitation } from "../../types";
import {
  CreateWorkspaceInviteInput,
  createWorkspaceInviteSchema,
} from "../../schemas/create-workspace-invite-schema";
import { inviteUserToWorkspace } from "../../services/invite-user-to-workspace";

// import { sendInvitationEmail } from "../services/send-invitation-email";

export async function createWorkspaceInvite(
  input: CreateWorkspaceInviteInput,
): Promise<Result<Invitation>> {
  // incoming data vadalidation
  // const { success, data } = createWorkspaceInviteSchema.safeParse(input);
  // if (!success) return fail("Invalid invitation data.");
  // const { workspaceId, email, role } = data;

  // Auth and Authzi validation
  const { user } = await requireWorkspaceAdmin(input.workspaceId);

  const invitation = await inviteUserToWorkspace(input, user);

  // todo revalidate cache
  // revalidatePath(`/dashboard/w/${workspaceId}/members`);

  return invitation;
}
