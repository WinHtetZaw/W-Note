export type WorkspaceRole = "owner" | "admin" | "member";

export interface PendingInvitation {
  id: string;
  email: string;
  role: WorkspaceRole;
  invitedAt: string;
  expiresAt: string;
}

export const pendingInvitations: PendingInvitation[] = [
  {
    id: "1",
    email: "emma@example.com",
    role: "member",
    invitedAt: "12 minutes ago",
    expiresAt: "6 days",
  },

  {
    id: "2",
    email: "john@example.com",
    role: "admin",
    invitedAt: "1 hour ago",
    expiresAt: "6 days",
  },
];
