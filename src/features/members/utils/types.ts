import { getMembers } from "../server/queries/get-all-members";

export type Member = NonNullable<
  Awaited<ReturnType<typeof getMembers>>
>[number];
