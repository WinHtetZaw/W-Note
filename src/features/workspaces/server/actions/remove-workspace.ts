"use server";

import { requireWorkspaceOwner } from "@/lib/permissions";
import { deleteWorkspace } from "../mutations/delete-workspace";

export async function removeWorkspace(workspaceId: string) {
  await requireWorkspaceOwner(workspaceId);

  const result = await deleteWorkspace(workspaceId);

  return { success: result };
}
