// features/workspace/members/types.ts

export type WorkspaceRole = "owner" | "admin" | "member";

export type MemberStatus = "active" | "offline";

export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: WorkspaceRole;
  status: MemberStatus;
  joinedAt: string;
  lastActive: string;
}
