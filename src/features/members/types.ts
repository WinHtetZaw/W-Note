// features/workspace/members/types.ts

import { getAllMembers } from "./server/queries/get-all-members";

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

export type MemberWithDetail = NonNullable<
  Awaited<ReturnType<typeof getAllMembers>>
>[number];
