import InvitationButton from "@/features/invitations/components/invitation-button";
import InvitationList from "@/features/invitations/components/invitation-list";
import MembersPage from "@/features/members/components/members-page";
import { fetchMembers } from "@/features/members/server/actions/fetch-members";
import { fetchUserWorkspace } from "@/features/workspaces/server/actions/fetch-user-workspace";
import { fetchUserWorkspaceRole } from "@/features/workspaces/server/actions/fetch-usre-workspace-role";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function Page({ params }: Props) {
  return (
    <Suspense fallback={<p>Memebers page fallback</p>}>
      <MembersPageWrapper params={params} />
    </Suspense>
  );
}

async function MembersPageWrapper({ params }: Props) {
  const { workspaceId } = await params;

  // Later:
  // const session = await auth()
  const userRoleResult = await fetchUserWorkspaceRole(workspaceId);
  if (!userRoleResult.data) {
    console.log(userRoleResult);
    return <p>fail to fetch uer role</p>;
  }

  const membersResult = await fetchMembers(workspaceId);
  if (!membersResult.data) {
    return <p>fail to fetch members</p>;
  }

  return (
    <MembersPage
      workspaceId={workspaceId}
      currentUserRole={userRoleResult.data}
      invitationButton={<InvitationButton />}
      invitationList={<InvitationList />}
      members={membersResult.data}
    />
  );
}
