import { pendingInvitations } from "../constant";
import InvitationCard from "./invitation-card";
import InvitationCard2 from "./invitation-card2";
import { fetchWorkspacePendingInvitations } from "../server/actions/fetch-workspace-pending-invitations";

export default async function InvitationList({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const wsPendingInvitations =
    await fetchWorkspacePendingInvitations(workspaceId);

  if (wsPendingInvitations.code) {
    console.log(wsPendingInvitations);
    return <p>user pending invitaions not found</p>;
  }

  // console.log("pending--->", result.data[0]);

  return (
    <section className="mt-20">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pending Invitations</h2>

        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
          {wsPendingInvitations.data.length} Pending
        </span>
      </div>

      {wsPendingInvitations.data.length === 0 ? (
        <EmptyState
          title="No pending invitations"
          description="Everyone has accepted their invitations."
        />
      ) : (
        <div className="space-y-5">
          {/* {pendingInvitations.map((invite) => (
            <InvitationCard2 key={invite.id} invitation={invite} />
          ))} */}

          {wsPendingInvitations.data.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[32px] border border-dashed border-white/10 bg-white/3 p-16 text-center">
      <h3 className="text-2xl font-bold">{title}</h3>

      <p className="mt-3 text-zinc-500">{description}</p>
    </div>
  );
}
