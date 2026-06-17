"use server";

import { requireAuth } from "@/lib/permissions";
import {
  getWorkspacesOverview,
  WorkspacesOverview,
} from "../queries/get-workspaces-overview";
import { fail, ok, Result } from "@/lib/types";

export const fetchWorkspacesOverview = async (): Promise<
  Result<WorkspacesOverview>
> => {
  const user = await requireAuth();

  const workspaces = await getWorkspacesOverview(user.id);

  if (!workspaces) {
    return fail("No workspaces found");
  }

  return ok(workspaces);
};
