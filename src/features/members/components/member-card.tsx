// features/workspace/members/components/member-card.tsx

"use client";

import Link from "next/link";
import { Clock3, Mail } from "lucide-react";

import type { WorkspaceMember } from "../types";
import RoleBadge from "./role-badge";
import StatusBadge from "./status-badge";
import MemberActions from "./member-actions";
import { Member } from "../utils/types";
import { timeAgo } from "@/lib/utils";

interface Props {
  workspaceId: string;
  // member: WorkspaceMember;
  member: Member;
  currentUserRole: "owner" | "admin" | "member";
}

export default function MemberCard({
  workspaceId,
  member,
  currentUserRole,
}: Props) {
  return (
    <div className="relative rounded-[32px] glass p-6">
      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <Link
          href={`/workspace/${workspaceId}/members/${member.userId}`}
          className="flex items-center gap-5"
        >
          <div className="size-16 content-center text-center rounded-full bg-violet-600 text-xl font-bold text-white">
            <span>{member.user.name.charAt(0)}</span>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">
              {member.user.name}
            </h2>

            <div className="mt-2 flex flex-wrap gap-5 text-sm">
              <div className=" flex items-center gap-2 text-zinc-400">
                <Mail className="h-4 w-4" />
                {member.user.email}
              </div>

              <div className=" flex items-center gap-2 text-sm text-zinc-500">
                <Clock3 className="h-4 w-4" />
                {/* Last active {timeAgo(member.joinedAt)} */}
                Joined in {timeAgo(member.joinedAt)}
              </div>
            </div>
          </div>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-3">
          <RoleBadge role={member.role} />

          {/* <StatusBadge status={"offline"} /> */}

          <MemberActions
            workspaceId={workspaceId}
            member={member}
            currentUserRole={currentUserRole}
          />
        </div>
      </div>
    </div>
  );
}
