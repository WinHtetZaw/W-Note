// lib/permissions.ts

import type { WorkspaceRole } from "./types";

export const PERMISSIONS: Record<string, readonly WorkspaceRole[]> = {
  "workspace:view": ["owner", "admin", "member"],
  "workspace:update": ["owner", "admin"],
  "workspace:delete": ["owner"],

  "note:view": ["owner", "admin", "member"],
  "note:create": ["owner", "admin", "member"],
  "note:update": ["owner", "admin", "member"],
  "note:delete": ["owner", "admin"],
};

export type Permission = keyof typeof PERMISSIONS;
