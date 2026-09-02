"use server";

import { updateTag } from "next/cache";
import { resendWorkspaceInviteService } from "../../services/resend-workspace-invite-service";
import { cacheTags } from "@/lib/cache/tags";
import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";

type IncomingData = { invitationId: string; workspaceId: string };

export async function resendWorkspaceInvite(rawData: IncomingData) {
  const [error, isUpdated] = await resendWorkspaceInviteService(rawData);

  if (error == null) {
    updateTag(cacheTags.invitation(rawData.invitationId));
    return { success: isUpdated };
  }

  const reason = error.reason;
  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "WORKSPACE_NOT_FOUND":
      return { code: ErrorCode.NotFound, reason };
    case "INVIATION_NOT_FOUND":
      return { code: ErrorCode.NotFound, reason };
    case "NOT_WORKSPACE_MEMBER":
    case "INVITATION_ALREADY_ACCEPTED":
      return { code: ErrorCode.Conflict, reason };
    case "INVITATION_ALREADY_DECLINED":
      return { code: ErrorCode.Conflict, reason };
    case "INVITATION_ALREADY_REVOKED":
      return { code: ErrorCode.Conflict, reason };
    case "INVITATION_EXPIRED":
      return { code: ErrorCode.Conflict, reason };
    case "NOT_WORKSPACE_MEMBER":
      return { code: ErrorCode.Forbidden, reason };
    case "NOT_WORKSPACE_ADMIN_OR_OWNER":
      return { code: ErrorCode.Forbidden, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
