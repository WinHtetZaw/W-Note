"use server";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { editWorkspaceService } from "../../services/edit-workspace-service";
import { UpdateWorkspaceInput } from "../../schemas/update-workspace-schema";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";

export async function editWorkspace(rawData: UpdateWorkspaceInput) {
  const [error, data] = await editWorkspaceService(rawData);

  if (error == null) {
    // updateTag(cacheTags.workspace(data.id));
    // updateTag(cacheTags.userWorkspaces(data.id));
    return { data };
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
