"use server";

import { requireAuth } from "@/lib/permissions";
import { getUserWorkspace, UserWorkspace } from "../queries/get-user-workspace";
import { fail, ok, Result } from "@/lib/types";

export async function fetchUserWorkspace(): Promise<Result<UserWorkspace>> {
  const user = await requireAuth();

  const workspace = await getUserWorkspace(user.id);

  if (!workspace) {
    return fail("No workspace found");
  }

  return ok(workspace);
}
