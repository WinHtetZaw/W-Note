import PageHead from "@/components/dashboard/page-head";
import UserPendingInvitationCountBadge, {
  UserPendingInvitationCountBadgeLoading,
} from "@/features/invitations/components/user-pending-invitation-count-badge";
import UserPendingInvitationList, {
  UserPendingInvitationListLoading,
} from "@/features/invitations/components/user-pending-invitation-list";
import { Suspense } from "react";

export default function InvitationsPage() {
  return (
    <div className="mx-auto max-w-5xl h-full px-6 py-16 space-y-12">
      <PageHead
        pageLabel="Workspace Invitations"
        title="You've Been Invited"
        subTitle="Review invitations from your teammates and join shared workspaces."
      >
        <Suspense fallback={<UserPendingInvitationCountBadgeLoading />}>
          <UserPendingInvitationCountBadge />
        </Suspense>
      </PageHead>

      <Suspense fallback={<UserPendingInvitationListLoading />}>
        <UserPendingInvitationList />
      </Suspense>
    </div>
  );
}
