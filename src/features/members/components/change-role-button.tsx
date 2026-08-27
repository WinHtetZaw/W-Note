"use client";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield } from "lucide-react";
import { useState, useTransition } from "react";
import { changeMemberRoleAction } from "../server/actions/change-member-role-action";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";
import { wait } from "@/lib/utils";

type Props = {
  workspaceId: string;
  memberId: string;
  currentRole: "member" | "admin" | "owner";
};

export default function ChangeRoleButton(props: Props) {
  const { workspaceId, memberId, currentRole } = props;
  const [isPending, startTransition] = useTransition();

  const handleUpdateRole = (role: "member" | "admin") => {
    startTransition(async () => {
      // await wait(2000);
      // return;
      const result = await changeMemberRoleAction({
        workspaceId,
        memberId,
        role,
      });
      if (!result.success) {
        console.log(result.details);
        toast.error(errorMessages[result.code]);
        return;
      }

      toast.success("Successfully updated role.");
    });
  };
  return (
    <>
      {/* <DropdownMenuItem className="h-11 cursor-pointer rounded-xl">
        <Shield className="mr-3 h-4 w-4 text-icon" />
        Change Role
      </DropdownMenuItem> */}
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="h-11 cursor-pointer rounded-xl">
          <Shield className="mr-3 h-4 w-4 text-icon" />
          Change Role
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent className="p-2 w-48">
            <DropdownMenuItem
              onClick={() => handleUpdateRole("admin")}
              className="h-11 cursor-pointer rounded-xl"
            >
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleUpdateRole("member")}
              className="h-11 cursor-pointer rounded-xl"
            >
              Member
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  );
}
