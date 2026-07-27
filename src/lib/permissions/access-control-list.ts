import { keyof } from "zod";
import { WorkspaceRole } from "./types";

export const Permissions = {
  WorkspaceView: "workspace:view",
  WorkspaceUpdate: "workspace:update",
  WorkspaceDelete: "workspace:delete",
  WorkspaceInvite: "workspace:invite",

  FolderCreate: "folder:create",
  FolderUpdate: "folder:update",
  FolderDelete: "folder:delete",

  NoteCreate: "note:create",
  NoteUpdate: "note:update",
  NoteDelete: "note:delete",

  NoteVersionView: "noteVersion:view",
  NoteVersionRestore: "noteVersion:restore",

  AIUse: "ai:use",

  BillingManage: "billing:manage",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

export const RolePermissions: Record<WorkspaceRole, readonly Permission[]> = {
  owner: [
    Permissions.WorkspaceView,
    Permissions.WorkspaceUpdate,
    Permissions.WorkspaceDelete,
    Permissions.WorkspaceInvite,

    Permissions.FolderCreate,
    Permissions.FolderUpdate,
    Permissions.FolderDelete,

    Permissions.NoteCreate,
    Permissions.NoteUpdate,
    Permissions.NoteDelete,

    Permissions.NoteVersionView,
    Permissions.NoteVersionRestore,

    Permissions.AIUse,

    Permissions.BillingManage,
  ],

  admin: [
    Permissions.WorkspaceView,
    Permissions.WorkspaceUpdate,
    Permissions.WorkspaceInvite,

    Permissions.FolderCreate,
    Permissions.FolderUpdate,
    Permissions.FolderDelete,

    Permissions.NoteCreate,
    Permissions.NoteUpdate,
    Permissions.NoteDelete,

    Permissions.NoteVersionView,
    Permissions.NoteVersionRestore,

    Permissions.AIUse,
  ],

  member: [
    Permissions.WorkspaceView,

    Permissions.FolderCreate,

    Permissions.NoteCreate,
    Permissions.NoteUpdate,

    Permissions.NoteVersionView,

    Permissions.AIUse,
  ],
};
