"use server";

import { requireAuth } from "@/lib/permissions";
import { getUserWorkspace, UserWorkspace } from "../queries/get-user-workspace";
import { fail, ok, Result } from "@/lib/types";

export async function fetchUserWorkspace() {
  const [error, user] = await requireAuth();
  if (error) {
    return { messaage: false };
  }

  const workspace = await getUserWorkspace(user.id);

  if (!workspace) {
    return fail("No workspace found");
  }

  return ok(workspace);
}
