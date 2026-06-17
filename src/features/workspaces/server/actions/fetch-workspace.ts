"use server";

import { requireWorkspaceMember } from "@/lib/permissions";
import { getWorkspace, Workspace } from "../queries/get-workspace";
import { fail, ok, Result } from "@/lib/types";

export async function fetchWorkspace(
  workspaceId: string,
): Promise<Result<Workspace>> {
  await requireWorkspaceMember(workspaceId);

  const workspace = await getWorkspace(workspaceId);
  if (!workspace) {
    return fail("Workspace not found");
  }
  return ok(workspace);
}
