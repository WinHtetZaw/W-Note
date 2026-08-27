import { getUserWorkspaces } from "./server/queries/get-user-workspaces";

export type UserWorkspace = NonNullable<
  Awaited<ReturnType<typeof getUserWorkspaces>>
>[number];
