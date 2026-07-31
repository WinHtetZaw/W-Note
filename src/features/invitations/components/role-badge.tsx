// features/workspace/members/components/role-badge.tsx

import { Crown, Shield, User } from "lucide-react";
import { WorkspaceRole } from "../constant";

interface Props {
  role: WorkspaceRole;
}

export default function RoleBadge({ role }: Props) {
  const config = {
    owner: {
      label: "Owner",
      icon: Crown,
      className: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    },

    admin: {
      label: "Admin",
      icon: Shield,
      className: "border-violet-500/20 bg-violet-500/10 text-violet-400",
    },

    member: {
      label: "Member",
      icon: User,
      className: "border-white/10 bg-white/5 text-zinc-300",
    },
  };

  const item = config[role];

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
