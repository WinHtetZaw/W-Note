"use server";

import { requireWorkspaceOwner } from "@/lib/permissions";
import { updateWorkspaceOwnership } from "../mutations/update-workspace-ownership";

export async function transferWorkspaceOwnership(
  workspaceId: string,
  newOwnerId: string,
) {
  const { user } = await requireWorkspaceOwner(workspaceId);

  const result = await updateWorkspaceOwnership(
    workspaceId,
    newOwnerId,
    user.id,
  );

  return { success: result };
}
