// src/lib/cache/keys.ts

export const queryKeys = {
  /* =========================================================
     USER
  ========================================================= */

  user: {
    all: ["user"] as const,

    detail: (userId: string) => ["user", userId] as const,

    workspaces: (userId: string) => ["user", userId, "workspaces"] as const,

    invitations: (userId: string) => ["user", userId, "invitations"] as const,

    aiUsage: (userId: string) => ["user", userId, "ai-usage"] as const,
  },

  /* =========================================================
     WORKSPACES
  ========================================================= */

  workspaces: {
    all: ["workspaces"] as const,

    detail: (workspaceId: string) => ["workspaces", workspaceId] as const,

    overview: (workspaceId: string) =>
      ["workspaces", workspaceId, "overview"] as const,

    members: (workspaceId: string) =>
      ["workspaces", workspaceId, "members"] as const,

    folders: (workspaceId: string) =>
      ["workspaces", workspaceId, "folders"] as const,

    notes: (workspaceId: string) =>
      ["workspaces", workspaceId, "notes"] as const,

    invitations: (workspaceId: string) =>
      ["workspaces", workspaceId, "invitations"] as const,

    subscription: (workspaceId: string) =>
      ["workspaces", workspaceId, "subscription"] as const,

    aiUsage: (workspaceId: string) =>
      ["workspaces", workspaceId, "ai-usage"] as const,
  },

  /* =========================================================
     FOLDERS
  ========================================================= */

  folders: {
    all: ["folders"] as const,

    detail: (folderId: string) => ["folders", folderId] as const,

    notes: (folderId: string) => ["folders", folderId, "notes"] as const,
  },

  /* =========================================================
     NOTES
  ========================================================= */

  notes: {
    all: ["notes"] as const,

    detail: (noteId: string) => ["notes", noteId] as const,

    versions: (noteId: string) => ["notes", noteId, "versions"] as const,

    search: (workspaceId: string, search: string) =>
      ["workspaces", workspaceId, "notes", "search", search] as const,
  },

  /* =========================================================
     INVITATIONS
  ========================================================= */

  invitations: {
    all: ["invitations"] as const,

    detail: (invitationId: string) => ["invitations", invitationId] as const,

    pending: (userId: string) => ["invitations", "pending", userId] as const,

    workspace: (workspaceId: string) =>
      ["invitations", "workspace", workspaceId] as const,
  },

  /* =========================================================
     SUBSCRIPTIONS
  ========================================================= */

  subscriptions: {
    all: ["subscriptions"] as const,

    workspace: (workspaceId: string) => ["subscriptions", workspaceId] as const,
  },

  /* =========================================================
     AI USAGE
  ========================================================= */

  aiUsage: {
    all: ["ai-usage"] as const,

    workspace: (workspaceId: string) =>
      ["ai-usage", "workspace", workspaceId] as const,

    user: (userId: string) => ["ai-usage", "user", userId] as const,
  },
} as const;
