import { fail, ok, Result } from "@/lib/types";
import { getInvitationByEmail } from "../server/queries/get-invitation-by-email";
import { generateInvitationToken } from "./generate-token";
import { createInvitation } from "../server/mutations/create-invitation";
import { generateInviteLink } from "./generate-invite-link";
import { sendInvitationEmail } from "./send-invitation-email";
import {
  CreateWorkspaceInviteInput,
  createWorkspaceInviteSchema,
} from "../schemas/create-workspace-invite-schema";
import { getInvitationExpiration } from "./get-invitation-expiration";
import { logger, User } from "better-auth";
import { Invitation } from "../types";
import { ensureNotWorkspaceMember } from "./ensure-not-workspace-member";
import { requireAuth } from "@/lib/permissions";
import { hashInvitationToken } from "./hash-invitation-token";
import { getUserByEmail } from "@/features/auth/server/queries/get-user-by-email";

type Meta = { emailSent: boolean; error: unknown };
type InviteUserToWorkspace = Invitation & { emailSent: boolean };

export async function inviteUserToWorkspace(
  input: CreateWorkspaceInviteInput,
  sender: User,
): Promise<Result<InviteUserToWorkspace>> {
  const { success, data } = createWorkspaceInviteSchema.safeParse(input);
  if (!success) return fail("Invalid invitation data.");
  const { workspaceId, email, role } = data;

  // todo already memeber?
  const user = await getUserByEmail(workspaceId, email);
  if (user) {
    const isNotAMember = await ensureNotWorkspaceMember(workspaceId, user.id);

    if (!isNotAMember) {
      return fail("User is already a workspace member.");
    }
  }

  // Checking for existing invitation
  const existing = await getInvitationByEmail(workspaceId, email);
  if (existing) fail("User already has a pending invitation.");

  const token = generateInvitationToken();
  const tokenHash = hashInvitationToken(token);

  const expiresAt = getInvitationExpiration();

  // mutation db
  const invitation = await createInvitation({
    workspaceId,
    invitedBy: sender.id,
    email,
    role,
    tokenHash,
    expiresAt,
  });
  if (!invitation) return fail("Fail to create invatation");

  const invitationLink = generateInviteLink({ token });
  const emailResult = await sendInvitationEmail({
    to: email,
    workspaceName: "placeholder workspace name",
    inviterName: sender.name,
    role,
    invitationLink,
    expiresAt: expiresAt.toLocaleDateString(),
  });

  if (!emailResult.success) {
    // logger.error(emailResult.error);
    const res = {
      ...invitation,
      emailSent: false,
    };

    return ok(res);
  }

  return ok({ ...invitation, emailSent: true });
}
