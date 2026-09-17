import { getMembers } from "../server/queries/get-members";

export type Member = NonNullable<
  Awaited<ReturnType<typeof getMembers>>
>[number];
