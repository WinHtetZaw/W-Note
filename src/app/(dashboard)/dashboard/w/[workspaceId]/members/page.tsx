import InvitationButton from "@/features/invitations/components/invitation-button";
import InvitationList from "@/features/invitations/components/invitation-list";
import MembersPage from "@/features/members/components/members-page";
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
  // const role = await getWorkspaceRole(...)

  return (
    <MembersPage
      workspaceId={workspaceId}
      currentUserRole="owner"
      invitationButton={<InvitationButton />}
      invitationList={<InvitationList />}
    />
  );
}
