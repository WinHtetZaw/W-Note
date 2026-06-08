"use server";

import { requireAuth } from "@/lib/permissions";
import { getUserWorkspaces } from "../queries/get-user-workspaces";

export async function fetchUserWorkspaces() {
  const user = await requireAuth();

  const workspaces = await getUserWorkspaces(user.id);
  if (!workspaces) {
    return { success: false, message: "No workspaces found" };
  }

  return { success: true, data: workspaces };
}
