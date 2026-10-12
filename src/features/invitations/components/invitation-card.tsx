import { CalendarClock, Clock3, Mail } from "lucide-react";
import InvitationActions from "./invitation-actions";
import { timeAgo } from "@/lib/utils";
import { formatExpiryInDays } from "@/utils/formatting";
import InvitationStatusBadge from "./invitation-status-badge";
import { PendingInvitation } from "../types";
import RoleBadge from "@/components/ui/role-badge";

interface Props {
  invitation: PendingInvitation;
}

export default function InvitationCard({ invitation }: Props) {
  return (
    <div className="rounded-[32px] relative p-6 glass">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-3 lg:gap-6">
          <div className="flex size-16 min-w-16 items-center justify-center rounded-full bg-violet-600/20">
            <Mail className="size-7 text-icon" />
          </div>

          <div className="flex-1 pr-12 lg:pr-0">
            <h2 className="mb-2 w-full text-lg font-semibold  line-clamp-1">
              {invitation.email}
            </h2>

            <div className="flex flex-wrap gap-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock3 className="size-4" />
                Invited {timeAgo(invitation.updatedAt)}
              </div>

              <div className="flex items-center gap-2">
                <CalendarClock className="size-4" />
                Expires in {formatExpiryInDays(invitation.expiresAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <InvitationStatusBadge status={invitation.status} />
          <RoleBadge role={invitation.role} />
          <InvitationActions
            invitationId={invitation.id}
            workspaceId={invitation.workspace.id}
          />
        </div>
      </div>
    </div>
  );
}
