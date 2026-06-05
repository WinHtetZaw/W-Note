"use server";

import {
  requireAuth,
  requireWorkspaceAdmin,
  requireWorkspaceMember,
} from "@/lib/permissions";
import { getFolder, getFolderNotes, getFolders } from "./queries";
import {
  CreateFolderInput,
  createFolderSchema,
} from "../schemas/create-folder-schema";
import { deleteFolder, insertFolder, updateFolder } from "./mutations";
import {
  UpdateFolderInput,
  updateFolderSchema,
} from "../schemas/update-folder-schema";

export async function fetchFolder(folderId: string, workspaceId: string) {
  // Validate Auth
  await requireAuth();

  // permission check
  await requireWorkspaceMember(workspaceId);

  // fetching a folder
  const folder = await getFolder(folderId);
  if (!folder) {
    return { success: false, message: "No folder found!" };
  }

  return { success: true, data: folder };
}

export async function listFolders(workspaceId: string) {
  // Validate Auth
  await requireAuth();

  // permission check
  await requireWorkspaceMember(workspaceId);

  // fetching folders
  const folders = await getFolders(workspaceId);
  if (!folders || folders.length <= 0) {
    return { success: false, message: "No folders found!" };
  }

  return { success: true, data: folders };
}

// export async function listFoldersWithNotes() {
//   // Validate Auth
//   const user = await requireAuth();

//   const { success, message, data } = await getUserWorkspace(user.id);
//   if (!data) return { success, message };
//   const workspaceId = data.id;

//   // permission check
//   await requireWorkspaceMember(workspaceId);

//   // fetching folders
//   const folders = await getFoldersWithNotes(workspaceId);
//   if (!folders || folders.length <= 0) {
//     return { success: false, message: "No folders found!" };
//   }

//   return { success: true, data: folders };
// }

export async function listFolderNotes(folderId: string, workspaceId: string) {
  // Validate Auth
  await requireAuth();

  // permission check
  await requireWorkspaceMember(workspaceId);

  // fetching a folder notes
  const folderNotes = await getFolderNotes(folderId);
  if (!folderNotes || folderNotes.length <= 0) {
    return { success: false, message: "No notes found!" };
  }

  return { success: true, data: folderNotes };
}

export async function createFolder(input: CreateFolderInput) {
  // Validate Auth
  await requireAuth();

  // validate incoming data
  const { success, data } = createFolderSchema.safeParse(input);
  if (!success) {
    return { success, message: "Invalid folder data" };
  }

  // permission check
  await requireWorkspaceAdmin(data.workspaceId);

  // creating folder
  const folder = await insertFolder(data);
  if (!folder) {
    return { success: false, message: "Fail to create folder" };
  }

  return {
    success: true,
    message: "Successfully folder created",
    data: folder,
  };
}

export async function renameFolder(input: UpdateFolderInput) {
  // Validate Auth
  await requireAuth();

  // validate incoming data
  const { success, data } = updateFolderSchema.safeParse(input);
  if (!success) {
    return { success, message: "Invalid folder data" };
  }

  // permission check
  await requireWorkspaceAdmin(data.workspaceId);

  // updating folder
  const isUpdated = await updateFolder(data, data.folderId);
  if (!isUpdated) {
    return { success: isUpdated, message: "Fail to rename folder" };
  }

  return {
    success: true,
    message: "Successfully folder rename",
  };
}

export async function removeFolder(folderId: string) {
  // Validate Auth
  await requireAuth();

  // permission check
  const folder = await getFolder(folderId);
  if (!folder) {
    return { success: false, message: "Fail to delete folder" };
  }
  await requireWorkspaceAdmin(folder.workspaceId);

  // deleting folder
  const isDeleted = await deleteFolder(folderId);
  if (!isDeleted) {
    return { success: isDeleted, message: "fail to delete folder" };
  }

  return { success: true, message: "Successfully delete folder" };
}
