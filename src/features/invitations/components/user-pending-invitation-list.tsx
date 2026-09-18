import { Sparkles } from "lucide-react";
import { fetchUserPendingInvitations } from "../server/actions/fetch-user-pending-invitations";
import UserInvitationCard from "./user-invitation-card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function UserPendingInvitationList() {
  const userPendingInvitations = await fetchUserPendingInvitations();
  if (userPendingInvitations.code) {
    return <p>not found invitations</p>;
  }
  const invitations = userPendingInvitations.data.invitations;

  return (
    <section className="space-y-6">
      {invitations.length === 0 ? (
        <EmptyState />
      ) : (
        invitations.map((invitation) => (
          <UserInvitationCard key={invitation.id} invitation={invitation} />
        ))
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center">
      {/* <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10">
        <Sparkles className="h-10 w-10 text-violet-400" />
      </div> */}

      <h2 className="text-lg font-bold">No Invitations</h2>

      <p className="text-muted">
        You don't have any pending workspace invitations.
      </p>
    </div>
  );
}

export function UserPendingInvitationListLoading() {
  return (
    <div className="space-y-6">
      <UserPendingInvitationSkeleton />
      <UserPendingInvitationSkeleton />
      <UserPendingInvitationSkeleton />
    </div>
  );
}

function UserPendingInvitationSkeleton() {
  return (
    <div className="rounded-[32px] p-8 glass">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-5">
          <Skeleton className="flex h-16 w-16 items-center justify-center rounded-full" />

          <div className="flex-1">
            <Skeleton className="h-8 w-40 rounded-xl mb-4" />

            <Skeleton className="h-8 w-full md:w-10/12 rounded-xl" />
          </div>
        </div>

        <div className="flex gap-3 ml-auto">
          <Skeleton className="h-12 w-28 rounded-2xl" />
          <Skeleton className="h-12 w-28 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
