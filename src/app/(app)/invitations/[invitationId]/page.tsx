import MainLoading from "@/components/ui/main-loading";
import AcceptInvitationButton from "@/features/invitations/components/accept-invitation-button";
import DeclineInvitationButton from "@/features/invitations/components/decline-invitation-button";
import { fetchUserPendingInvitationById } from "@/features/invitations/server/actions/fetch-user-pending-invitation-by-id";
import { formatExpiryInDays } from "@/utils/formatting";
import {
  CalendarClock,
  CheckCircle2,
  FolderTree,
  Sparkles,
  Users,
  WandSparkles,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    invitationId: string;
  }>;
};

export default async function InvitationPage({ params }: Props) {
  return (
    <Suspense fallback={<MainLoading />}>
      <InvitationPageContent params={params} />
    </Suspense>
  );
}

async function InvitationPageContent({ params }: Props) {
  const { invitationId } = await params;
  const result = await fetchUserPendingInvitationById(invitationId);

  if (result.code) {
    redirect("/invitations");
  }

  const invitation = result.data.invitation;

  const workspace = invitation.workspace;
  const inviter = invitation.inviter;
  const expiry = formatExpiryInDays(invitation.expiresAt);

  return (
    <section className="mx-auto flex min-h-[80vh] w-full md:w-2xl items-center px-6 py-16">
      <div className="w-full rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        {/* Header */}

        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/15">
            <Sparkles className="h-8 w-8 text-violet-400" />
          </div>

          <h1 className="text-4xl font-black">You're Invited!</h1>

          <p className="mt-4 text-zinc-400">
            Join a workspace and collaborate with your team.
          </p>
        </div>

        {/* Invitation */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/3 p-6">
          <div className="space-y-6">
            <InfoRow
              label="Workspace"
              value={workspace.name}
              icon={<Users className="h-5 w-5 text-violet-400" />}
            />

            <InfoRow
              label="Invited by"
              value={inviter.name}
              icon={<CheckCircle2 className="h-5 w-5 text-violet-400" />}
            />

            <InfoRow
              label="Role"
              value={invitation.role}
              icon={<FolderTree className="h-5 w-5 text-violet-400" />}
            />

            <InfoRow
              label="Invitation"
              value={`Expires ${expiry}`}
              icon={<CalendarClock className="h-5 w-5 text-violet-400" />}
            />
          </div>
        </div>

        {/* Benefits */}

        <div className="mt-8 rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <WandSparkles className="h-5 w-5 text-violet-400" />
            What you'll get
          </h2>

          <ul className="mt-5 space-y-4 text-zinc-300">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Create and edit shared notes
            </li>

            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Collaborate with workspace members
            </li>

            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Access shared folders
            </li>

            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Use AI-powered writing tools
            </li>
          </ul>
        </div>

        {/* Actions */}

        <div className="mt-10 space-y-3">
          <AcceptInvitationButton
            className="w-full h-14"
            invitationId={invitation.id}
            workspaceId={invitation.workspace.id}
          />

          <DeclineInvitationButton
            className="w-full h-14"
            invitationId={invitation.id}
            backUrl="/invitations"
          />

          {/* <button className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10">
            Decline
          </button> */}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account? Sign in to continue.
        </p>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
        {icon}
      </div>

      <div>
        <p className="text-sm text-zinc-500">{label}</p>

        <h3 className="font-semibold">{value}</h3>
      </div>
    </div>
  );
}
