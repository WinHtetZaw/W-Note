"use server";

import { updateTag } from "next/cache";
import { CreateWorkspaceInviteInput } from "../../schemas/create-workspace-invite-schema";
import { inviteUserToWorkspace } from "../../services/invite-user-to-workspace";
import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";
import { cacheTags } from "@/lib/cache/tags";

export async function createWorkspaceInvite(
  rawData: CreateWorkspaceInviteInput,
) {
  const [error, invitation] = await inviteUserToWorkspace(rawData);

  if (error == null) {
    updateTag(cacheTags.invitation(invitation.id));
    return { data: invitation };
  }

  const reason = error.reason;
  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "WORKSPACE_NOT_FOUND":
      return { code: ErrorCode.Forbidden, reason };
    case "NOT_WORKSPACE_MEMBER":
      return { code: ErrorCode.Forbidden, reason };
    case "NOT_WORKSPACE_ADMIN_OR_OWNER":
      return { code: ErrorCode.Forbidden, reason };
    case "INVITATION_ALREADY_EXISTS":
      return { code: ErrorCode.Conflict, reason };
    case "USER_ALREADY_A_WORKSPACE_MEMBER":
      return { code: ErrorCode.Conflict, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
