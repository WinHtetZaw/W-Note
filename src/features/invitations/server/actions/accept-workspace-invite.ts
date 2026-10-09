"use server";

import { cacheTags } from "@/lib/cache/tags";
import { acceptWorkspaceInviteService } from "../../services/accept-workspace-invite-service";
import { updateTag } from "next/cache";
import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";

export async function acceptWorkspaceInvite(invitationId: string) {
  const [error, member] = await acceptWorkspaceInviteService({
    invitationId,
  });

  if (error == null) {
    updateTag(cacheTags.invitation(invitationId));
    updateTag(cacheTags.workspaceMembers(member.workspaceId));
    updateTag(cacheTags.userInvitations(member.userId));
    return { data: member };
  }

  const reason = error.reason;

  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };

    case "NOT_AUTHENTICATED":
      redirect("/sign-in");

    case "INVITATION_NOT_FOUND":
      return { code: ErrorCode.NotFound, reason };

    case "WORKSPACE_NOT_FOUND":
      return { code: ErrorCode.NotFound, reason };

    case "USER_ALREADY_A_WORKSPACE_MEMBER":
      return { code: ErrorCode.Conflict, reason };

    case "PLAN_LIMIT_REACHED":
      return { code: ErrorCode.PlanLimitReached, reason };

    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };

    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
