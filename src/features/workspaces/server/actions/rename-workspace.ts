"use server";

import { requireWorkspaceAdmin } from "@/lib/permissions";
import {
  UpdateWorkspaceInput,
  updateWorkspaceSchema,
} from "../../schemas/update-workspace-schema";
import { updateWorkspace } from "../mutations/update-workspace";

export async function renameWorkspace(input: UpdateWorkspaceInput) {
  await requireWorkspaceAdmin(input.workspaceId);
  const { success, data } = updateWorkspaceSchema.safeParse(input);
  if (!success) {
    return { success, message: "Invalid workspace data" };
  }
  await requireWorkspaceAdmin(data.workspaceId);
  const result = await updateWorkspace(data);
  return { success: result, message: "Successfully renamed workspace" };
}
