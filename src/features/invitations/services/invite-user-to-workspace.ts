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
import { requireAuth, requireWorkspaceAdmin } from "@/lib/permissions";
import { hashInvitationToken } from "./hash-invitation-token";
import { getUserByEmail } from "@/features/auth/server/queries/get-user-by-email";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import { formatExpiryInDays } from "@/utils";
import { getWorkspace } from "@/features/workspaces/server/queries/get-workspace";

type Meta = { emailSent: boolean; error: unknown };
type InviteUserToWorkspace = Invitation & { emailSent: boolean };

export async function inviteUserToWorkspace(
  rawData: CreateWorkspaceInviteInput,
) {
  //========== Validating incoming data ==========//
  const result = createWorkspaceInviteSchema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, email, role } = result.data;

  //========== Auth and permisssion ==========//
  const [error, authData] = await requireWorkspaceAdmin(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }
  const { id: invitedBy, name: inviterName } = authData.user;

  //========== DB ==========//
  try {
    const user = await getUserByEmail(workspaceId, email);
    if (user) {
      const isNotAMember = await ensureNotWorkspaceMember(workspaceId, user.id);
      if (isNotAMember) {
        return fail({ reason: ErrorReason.UserAlreadyAWorkspaceMember });
      }
    }

    const existing = await getInvitationByEmail(workspaceId, email);
    if (existing) {
      return fail({ reason: ErrorReason.InvitationAlreadyExists });
    }

    const token = generateInvitationToken();
    const tokenHash = hashInvitationToken(token);
    const expiresAt = getInvitationExpiration();
    const invitation = await createInvitation({
      workspaceId,
      invitedBy,
      email,
      role,
      tokenHash,
      expiresAt,
    });

    const workspace = await getWorkspace(workspaceId);
    if (!workspace) {
      return fail({ reason: ErrorReason.WorkspaceNotFound });
    }
    const workspaceName = workspace.name;

    const expiresIn = formatExpiryInDays(expiresAt);
    const invitationLink = generateInviteLink({ token });

    const emailResult = await sendInvitationEmail({
      to: email,
      workspaceName,
      inviterName,
      role,
      invitationLink,
      expiresIn,
    });

    if (!emailResult.success) {
      // logger.error(emailResult.error);
      fail({ reason: ErrorReason.EmailDoesNotSent });
    }

    return ok({ ...invitation, emailSent: true });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
