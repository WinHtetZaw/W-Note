"use server";

import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { changeMemberRoleService } from "../services/change-member-role-service";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";

type IncomingData = {
  workspaceId: string;
  memberId: string;
  role: "member" | "admin";
};

export async function changeMemberRoleAction(rawData: IncomingData) {
  const [error, isChanged] = await changeMemberRoleService(rawData);

  if (error == null) {
    updateTag(cacheTags.workspaceMembers(rawData.workspaceId));
    return { success: isChanged };
  }

  const reason = error.reason;
  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "NOT_WORKSPACE_MEMBER":
      return { code: ErrorCode.Forbidden, reason };
    case "INSUFFICIENT_PERMISSION":
      return { code: ErrorCode.Forbidden, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
