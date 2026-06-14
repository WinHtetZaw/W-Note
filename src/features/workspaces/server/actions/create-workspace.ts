"use server";

import { requireAuth } from "@/lib/permissions";
import {
  CreateWorkspaceInput,
  createWorkspaceSchema,
} from "../../schemas/create-workspace-schema";
import { insertWorkspace } from "../mutations/insert-workspac";

export async function createWorkspace(input: CreateWorkspaceInput) {
  const user = await requireAuth();
  const validated = createWorkspaceSchema.safeParse(input);
  console.log("Validated workspace input:", validated);
  if (!validated.success) {
    return { success: false, message: "Invalid workspace data" };
  }
  const workspace = await insertWorkspace(validated.data, user.id);

  //   revalidateTag("user-workspaces", "max"); // global fallback
  //   revalidateTag(`user-${user.id}`, "max"); // this user's list
  //   revalidateTag("workspaces", "max"); // new workspace exists
  //   revalidateTag("workspace-members", "max"); // creator membership added
  return {
    success: true,
    message: "Succcessfully created workspace",
    data: workspace,
  };
}
