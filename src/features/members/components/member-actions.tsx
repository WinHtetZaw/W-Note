// features/workspace/members/components/member-actions.tsx

"use client";

import { useState } from "react";

import Link from "next/link";

import { Crown, MoreVertical, Shield, Trash2, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { WorkspaceMember } from "../types";
import RemoveMemberDialog from "./remove-member-dialog";

interface Props {
  workspaceId: string;
  member: WorkspaceMember;
  currentUserRole: "owner" | "admin" | "member";
}

export default function MemberActions({
  workspaceId,
  member,
  currentUserRole,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10">
            <MoreVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64  p-2 backdrop-blur-2xl"
        >
          <Link href={`/workspace/${workspaceId}/members/${member.id}`}>
            <DropdownMenuItem className="h-11 cursor-pointer rounded-xl">
              <User className="mr-3 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
          </Link>

          {(currentUserRole === "owner" || currentUserRole === "admin") && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="h-11 cursor-pointer rounded-xl">
                <Shield className="mr-3 h-4 w-4 text-violet-400" />
                Change Role
              </DropdownMenuItem>
            </>
          )}

          {currentUserRole === "owner" && member.role !== "owner" && (
            <DropdownMenuItem className="h-11 cursor-pointer rounded-xl">
              <Crown className="mr-3 h-4 w-4 text-yellow-400" />
              Transfer Ownership
            </DropdownMenuItem>
          )}

          {(currentUserRole === "owner" || currentUserRole === "admin") &&
            member.role !== "owner" && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setOpen(true)}
                  className="h-11 cursor-pointer rounded-xl text-red-400 focus:bg-red-500/10 focus:text-red-300"
                >
                  <Trash2 className="mr-3 h-4 w-4" />
                  Remove Member
                </DropdownMenuItem>
              </>
            )}
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveMemberDialog open={open} onOpenChange={setOpen} member={member} />
    </>
  );
}
