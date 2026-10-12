import { generalLinks, toolsLinks, workspaceLinks } from "./constants";
import { getOwnWorkspaces } from "./server/queries/get-own-workspaces";
import { getUserWorkspaces } from "./server/queries/get-user-workspaces";

export type WorkspaceLink = (typeof workspaceLinks)[number];
export type GeneralLink = (typeof generalLinks)[number];
export type ToolsLink = (typeof toolsLinks)[number];

export type UserWorkspace = NonNullable<
  Awaited<ReturnType<typeof getUserWorkspaces>>
>[number];

export type OwnWorkspaces = NonNullable<
  Awaited<ReturnType<typeof getOwnWorkspaces>>
>;
