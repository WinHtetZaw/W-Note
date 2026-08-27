import InvitationAcceptButton from "@/features/invitations/components/invitation-accept-button";
import { fetchUserPendingInvitations } from "@/features/invitations/server/actions/fetch-user-pending-invitations";
import { auth } from "@/lib/auth";
import { formatExpiryInDays } from "@/utils";
import { CalendarClock, Crown, Sparkles, Users } from "lucide-react";

const invitations = [
  {
    id: "1",
    workspace: "AI Notes Team",
    inviter: "Alex Johnson",
    role: "Member",
    expiresAt: "6 days",
  },

  {
    id: "2",
    workspace: "Marketing",
    inviter: "Sarah Kim",
    role: "Admin",
    expiresAt: "4 days",
  },
];

export default async function InvitationsPage() {
  // const user = await auth.api.getSession()
  const res = await fetchUserPendingInvitations();
  if (!res.data) {
    return <p>not found invitations</p>;
  }
  console.log("res data --->", res.data);
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}

      <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm">Workspace Invitations</span>
          </div>

          <h1 className="text-5xl font-black">You've Been Invited</h1>

          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Review invitations from your teammates and join shared workspaces.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
          <p className="text-sm text-zinc-500">Pending Invitations</p>

          <h2 className="text-3xl font-black">{invitations.length}</h2>
        </div>
      </section>

      {/* Invitations */}

      <section className="mt-12 space-y-6">
        {invitations.length === 0 ? (
          <EmptyState />
        ) : (
          invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))
        )}
        {res.data.map((el) => (
          <InvitationCard
            key={el.id}
            invitation={{
              id: el.id,
              workspace: el.workspace.name,
              workspaceId: el.workspace.id,
              inviter: el.inviter.name,
              role: el.role,
              expiresAt: formatExpiryInDays(el.expiresAt),
            }}
          />
        ))}
      </section>
    </main>
  );
}

function InvitationCard({
  invitation,
}: {
  invitation: {
    id: string;
    workspace: string;
    workspaceId: string;
    inviter: string;
    role: string;
    // expiresIn: string;
    expiresAt: string;
  };
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-xl font-bold">
            {invitation.workspace.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{invitation.workspace}</h2>

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Invited by {invitation.inviter}
              </div>

              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-400" />

                {invitation.role}
              </div>

              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                Expires in {invitation.expiresAt}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex gap-3">
          <button className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500">
            Accept
          </button>
          <InvitationAcceptButton
            invitationId={invitation.id}
            workspaceId={invitation.workspaceId}
          />

          <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 transition hover:bg-white/10">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[32px] border border-dashed border-white/10 bg-white/[0.03] p-20 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10">
        <Sparkles className="h-10 w-10 text-violet-400" />
      </div>

      <h2 className="text-3xl font-bold">No Invitations</h2>

      <p className="mt-4 text-zinc-500">
        You don't have any pending workspace invitations.
      </p>
    </div>
  );
}
