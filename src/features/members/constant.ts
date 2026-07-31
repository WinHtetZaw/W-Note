// features/workspace/members/constants.ts

import { WorkspaceMember } from "./types";

export const members: WorkspaceMember[] = [
  {
    id: "1",
    name: "Zeed",
    email: "zeed@example.com",
    role: "owner",
    status: "active",
    joinedAt: "Jan 14, 2026",
    lastActive: "2 minutes ago",
  },

  {
    id: "2",
    name: "Sarah Kim",
    email: "sarah@example.com",
    role: "admin",
    status: "active",
    joinedAt: "Feb 02, 2026",
    lastActive: "12 minutes ago",
  },

  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "member",
    status: "offline",
    joinedAt: "Mar 12, 2026",
    lastActive: "Yesterday",
  },

  {
    id: "4",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "member",
    status: "active",
    joinedAt: "Apr 20, 2026",
    lastActive: "Just now",
  },
];
