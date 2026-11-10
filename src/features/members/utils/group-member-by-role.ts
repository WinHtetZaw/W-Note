import { WorkspaceRole } from "../types";

export default function groupMembersByRole<T extends { role: WorkspaceRole }>(
  members: T[],
): Record<WorkspaceRole, T[]> {
  return members.reduce(
    (groups, member) => {
      groups[member.role].push(member);
      return groups;
    },
    {
      owner: [],
      admin: [],
      member: [],
    } as Record<WorkspaceRole, T[]>,
  );
}
