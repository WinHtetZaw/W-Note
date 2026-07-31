// features/workspace/members/components/status-badge.tsx

import { MemberStatus } from "../types";

interface Props {
  status: MemberStatus;
}

export default function StatusBadge({ status }: Props) {
  const isActive = status === "active";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
        isActive
          ? "bg-green-500/10 text-green-400"
          : "bg-zinc-500/10 text-zinc-400"
      }`}
    >
      <div
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-green-400" : "bg-zinc-500"
        }`}
      />

      {isActive ? "Active" : "Offline"}
    </div>
  );
}
