"use server";

import { requireWorkspaceMember } from "@/lib/permissions";
import { getWorkspace } from "../queries/get-workspace";

export async function fetchWorkspace(workspaceId: string) {
  await requireWorkspaceMember(workspaceId);

  const workspace = await getWorkspace(workspaceId);
  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }
  return { success: true, data: workspace };
}
