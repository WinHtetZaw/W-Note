"use server";

import { requireWorkspaceMember } from "@/lib/permissions";
import { stringEquals } from "@/lib/utils";
import { deleteWorkspaceMember } from "../mutations/delete-workspace-member";

export async function leaveWorkspace(workspaceId: string) {
  const { user, role } = await requireWorkspaceMember(workspaceId);

  if (stringEquals(role, "owner")) {
    return {
      success: false,
      message:
        "Owners cannot leave the workspace without transferring ownership",
    };
  }

  const result = await deleteWorkspaceMember(workspaceId, user.id);

  return { success: result };
}
