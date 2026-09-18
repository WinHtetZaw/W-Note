import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserPendingInvitationsCount } from "../server/actions/fetch-user-pending-invitations-count";

export default async function UserPendingInvitationCountBadge() {
  const countResult = await fetchUserPendingInvitationsCount();
  if (countResult.code) {
    throw new Error("Fail to get user pending invitations count");
  }

  return (
    <div className="rounded-2xl flex items-center gap-4 px-5 py-3 glass">
      <p className="text-sm text-zinc-500 max-w-44 min-w-fit">
        Pending Invitations :
      </p>

      <h2 className=" text-xl font-black">{countResult.count ?? 0}</h2>
    </div>
  );
}

export function UserPendingInvitationCountBadgeLoading() {
  return <Skeleton className="h-12 w-44 rounded-2xl" />;
}
