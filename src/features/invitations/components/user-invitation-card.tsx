import { CalendarClock, Crown, Users } from "lucide-react";
import { PendingInvitation } from "../server/queries/get-user-pending-invitations";
import { formatExpiryInDays } from "@/utils/formatting";
import InvitationAcceptButton from "./invitation-accept-button";
import { Button } from "@/components/ui/button";

type Props = {
  invitation: PendingInvitation;
};

export default function UserInvitationCard({ invitation }: Props) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-xl font-bold">
            {invitation.workspace.name.charAt(0)}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">{invitation.workspace.name}</h2>

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Invited by {invitation.inviter.name}
              </div>

              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-400" />

                {invitation.role}
              </div>

              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                Expires in {formatExpiryInDays(invitation.expiresAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex gap-3 ml-auto">
          <InvitationAcceptButton
            invitationId={invitation.id}
            workspaceId={invitation.workspace.id}
          />

          <Button variant={"outline"} className="h-12">
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
