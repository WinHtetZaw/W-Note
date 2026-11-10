import EmptyState from "@/components/ui/empty-state";
import { Member } from "../utils/types";
import { WorkspaceRole } from "../types";
import MemberCard from "./member-card";
import groupMembersByRole from "../utils/group-member-by-role";

type Props = {
  filteredMembers: Member[];
  workspaceId: string;
  currentUserRole: WorkspaceRole;
};
export default function MembersList(props: Props) {
  const { filteredMembers, workspaceId, currentUserRole } = props;
  const members = groupMembersByRole(filteredMembers);

  return (
    <div className="space-y-6">
      {filteredMembers.length === 0 ? (
        <EmptyState
          title="No members found"
          description="Try another search."
        />
      ) : (
        // filteredMembers.map((member) => (
        //   <MemberCard
        //     key={member.userId}
        //     workspaceId={workspaceId}
        //     member={member}
        //     currentUserRole={currentUserRole}
        //   />
        // ))
        Object.entries(members).map(([role, members]) => (
          <div key={role}>
            <div className="mt-2 space-y-2">
              {members.map((member) => (
                <MemberCard
                  key={member.userId}
                  workspaceId={workspaceId}
                  member={member}
                  currentUserRole={currentUserRole}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
