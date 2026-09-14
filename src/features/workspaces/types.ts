import { getOwnWorkspaces } from "./server/queries/get-own-workspaces";
import { getUserWorkspaces } from "./server/queries/get-user-workspaces";

export type UserWorkspace = NonNullable<
  Awaited<ReturnType<typeof getUserWorkspaces>>
>[number];

export type OwnWorkspaces = NonNullable<
  Awaited<ReturnType<typeof getOwnWorkspaces>>
>;
