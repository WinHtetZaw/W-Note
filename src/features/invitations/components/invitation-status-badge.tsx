import { Clock, CheckCircle2, XCircle, Ban, LucideIcon } from "lucide-react";
import { InvitationStatus } from "../types";

type Props = {
  status: InvitationStatus;
};

const config = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },

  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },

  declined: {
    label: "Declined",
    icon: XCircle,
    className: "border-red-500/20 bg-red-500/10 text-red-400",
  },

  revoked: {
    label: "Revoked",
    icon: Ban,
    className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
  },
} satisfies Record<
  InvitationStatus,
  {
    label: string;
    icon: LucideIcon;
    className: string;
  }
>;

export default function InvitationStatusBadge({ status }: Props) {
  const item = config[status];
  const Icon = item.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${item.className}`}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </div>
  );
}
