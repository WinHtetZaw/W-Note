"use server";

import { requireAuth } from "@/lib/permissions";
import { fail, ok, Result } from "@/lib/types";
import {
  getWorkspaceOverview,
  WorkspaceOverview,
} from "../queries/get-workspace-overview";

export const fetchWorkspaceOverview = async (
  workspaceId: string,
): Promise<Result<WorkspaceOverview>> => {
  await requireAuth();

  const workspace = await getWorkspaceOverview(workspaceId);

  if (!workspace) {
    return fail("No workspaces found");
  }

  return ok(workspace);
};
