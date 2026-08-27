"use server";

import { CreateWorkspaceInput } from "../../schemas/create-workspace-schema";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";
import { createWorkspaceService } from "../../services/create-workspace-service";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";

export async function createWorkspace(rawData: CreateWorkspaceInput) {
  const [error, workspace] = await createWorkspaceService(rawData);

  if (error == null) {
    // updateTag(cacheTags.workspace(workspace.id));
    // updateTag(cacheTags.userWorkspaces(workspace.ownerId));
    return { success: true, data: workspace };
  }

  const reason = error.reason;
  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
