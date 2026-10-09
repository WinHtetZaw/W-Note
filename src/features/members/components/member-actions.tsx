"use client";

import { useState } from "react";

import Link from "next/link";

import { MoreVertical, Trash2, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import RemoveMemberDialog from "./remove-member-dialog";
import { Member } from "../utils/types";
import ChangeRoleButton from "./change-role-button";
import TransferOwnershipButton from "./transfer-ownership-button";
import { Button } from "@/components/ui/button";

interface Props {
  workspaceId: string;
  member: Member;
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
          <Button
            variant={"outline"}
            className="size-11 p-0 absolute top-4 right-4 lg:static"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64 p-2 backdrop-blur-2xl">
          <Link href={`/workspace/${workspaceId}/members/${member.user.id}`}>
            <DropdownMenuItem className="h-11 cursor-pointer rounded-xl">
              <User className="mr-3 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
          </Link>

          {(currentUserRole === "owner" || currentUserRole === "admin") && (
            <>
              <DropdownMenuSeparator />

              {/* <DropdownMenuItem className="h-11 cursor-pointer rounded-xl">
                <Shield className="mr-3 h-4 w-4 text-icon" />
                Change Role
              </DropdownMenuItem> */}
              <ChangeRoleButton
                workspaceId={workspaceId}
                memberId={member.userId}
                currentRole={member.role}
              />
            </>
          )}

          {currentUserRole === "owner" && member.role !== "owner" && (
            // <DropdownMenuItem className="h-11 cursor-pointer rounded-xl">
            //   <Crown className="mr-3 h-4 w-4 text-yellow-400" />
            //   Transfer Ownership
            // </DropdownMenuItem>
            <TransferOwnershipButton
              workspaceId={workspaceId}
              newOwnerId={member.userId}
            />
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
