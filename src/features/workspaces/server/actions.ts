"use server";

import {
  requireAuth,
  requireWorkspaceAdmin,
  requireWorkspaceMember,
  requireWorkspaceOwner,
} from "@/lib/permissions";
import { getUserWorkspaces, getWorkspaceById } from "./queries";
import {
  deleteWorkspace,
  deleteWorkspaceMember,
  insertWorkspace,
  updateWorkspace,
  updateWorkspaceOwnership,
} from "./mutations";
import {
  CreateWorkspaceInput,
  createWorkspaceSchema,
} from "../schemas/create-workspace-schema";
import { revalidateTag } from "next/cache";
import {
  UpdateWorkspaceInput,
  updateWorkspaceSchema,
} from "../schemas/update-workspace-schema";
import { stringEquals } from "@/lib/utils";

export async function fetchUserWorkspaces() {
  const user = await requireAuth();

  const workspaces = await getUserWorkspaces(user.id);
  if (!workspaces) {
    return { success: false, message: "No workspaces found" };
  }

  return { success: true, data: workspaces };
}

export async function fetchWorkspaceById(workspaceId: string) {
  await requireAuth();
  await requireWorkspaceMember(workspaceId);

  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }
  return { success: true, data: workspace };
}

export async function createWorkspace(input: CreateWorkspaceInput) {
  const user = await requireAuth();
  const validated = createWorkspaceSchema.safeParse(input);
  if (!validated.success) {
    return { success: false, message: "Invalid workspace data" };
  }
  const workspace = await insertWorkspace(validated.data, user.id);

  //   revalidateTag("user-workspaces", "max"); // global fallback
  //   revalidateTag(`user-${user.id}`, "max"); // this user's list
  //   revalidateTag("workspaces", "max"); // new workspace exists
  //   revalidateTag("workspace-members", "max"); // creator membership added
  return { success: true, data: workspace };
}

export async function renameWorkspace(input: UpdateWorkspaceInput) {
  await requireAuth();
  const validated = updateWorkspaceSchema.safeParse(input);
  if (!validated.success) {
    return { success: false, message: "Invalid workspace data" };
  }
  await requireWorkspaceAdmin(validated.data.workspaceId);
  const result = await updateWorkspace(validated.data);
  return { success: result };
}

export async function removeWorkspace(workspaceId: string) {
  await requireAuth();
  await requireWorkspaceOwner(workspaceId);

  const result = await deleteWorkspace(workspaceId);

  return { success: result };
}

export async function leaveWorkspace(workspaceId: string) {
  await requireAuth();
  const { user, role } = await requireWorkspaceMember(workspaceId);

  if (stringEquals(role, "owner")) {
    return {
      success: false,
      message:
        "Owners cannot leave the workspace without transferring ownership",
    };
  }

  const result = await deleteWorkspaceMember(workspaceId, user.id);

  return { success: result };
}

export async function transferWorkspaceOwnership(
  workspaceId: string,
  newOwnerId: string,
) {
  const { user } = await requireWorkspaceOwner(workspaceId);

  const result = await updateWorkspaceOwnership(
    workspaceId,
    newOwnerId,
    user.id,
  );

  return { success: result };
}
