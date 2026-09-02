import { CalendarClock, Clock3, Mail } from "lucide-react";

import type { PendingInvitation } from "../types";

import RoleBadge from "./role-badge";
import InvitationActions from "./invitation-actions";

interface Props {
  invitation: PendingInvitation;
}

export default function InvitationCard2({ invitation }: Props) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/20">
            <Mail className="h-7 w-7 text-violet-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">{invitation.email}</h2>

            <div className="mt-2 flex flex-wrap gap-5 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Invited {invitation.invitedAt}
              </div>

              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                Expires in {invitation.expiresAt}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RoleBadge role={invitation.role} />

          <InvitationActions invitationId={invitation.id} />
        </div>
      </div>
    </div>
  );
}
