// src/lib/cache/tags.ts

export const cacheTags = {
  /* =========================================================
     USER
  ========================================================= */

  user: (userId: string) => `user:${userId}`,

  userWorkspaces: (userId: string) => `user:${userId}:workspaces`,

  userInvitations: (userId: string) => `user:${userId}:invitations`,

  userAIUsage: (userId: string) => `user:${userId}:ai-usage`,

  /* =========================================================
     WORKSPACE
  ========================================================= */

  workspace: (workspaceId: string) => `workspace:${workspaceId}`,

  workspaceOverview: (workspaceId: string) =>
    `workspace:${workspaceId}:overview`,

  workspaceMembers: (workspaceId: string) => `workspace:${workspaceId}:members`,

  workspaceFolders: (workspaceId: string) => `workspace:${workspaceId}:folders`,

  workspaceNotes: (workspaceId: string) => `workspace:${workspaceId}:notes`,

  workspaceInvitations: (workspaceId: string) =>
    `workspace:${workspaceId}:invitations`,

  workspaceSubscription: (workspaceId: string) =>
    `workspace:${workspaceId}:subscription`,

  workspaceAIUsage: (workspaceId: string) =>
    `workspace:${workspaceId}:ai-usage`,

  /* =========================================================
     FOLDER
  ========================================================= */

  folder: (folderId: string) => `folder:${folderId}`,

  folderNotes: (folderId: string) => `folder:${folderId}:notes`,

  /* =========================================================
     NOTE
  ========================================================= */

  note: (noteId: string) => `note:${noteId}`,

  noteVersions: (noteId: string) => `note:${noteId}:versions`,

  /* =========================================================
     INVITATION
  ========================================================= */

  invitation: (invitationId: string) => `invitation:${invitationId}`,

  /* =========================================================
     SUBSCRIPTION
  ========================================================= */

  subscription: (workspaceId: string) => `subscription:${workspaceId}`,

  /* =========================================================
     AI
  ========================================================= */

  aiUsage: (workspaceId: string) => `ai-usage:${workspaceId}`,
} as const;
