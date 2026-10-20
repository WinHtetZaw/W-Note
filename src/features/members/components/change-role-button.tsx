"use client";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield } from "lucide-react";
import { useTransition } from "react";
import { changeMemberRoleAction } from "../server/actions/change-member-role-action";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";

type Props = {
  workspaceId: string;
  memberId: string;
  currentRole: "member" | "admin" | "owner";
};

export default function ChangeRoleButton(props: Props) {
  const { workspaceId, memberId } = props;
  const [isPending, startTransition] = useTransition();

  const handleUpdateRole = (role: "member" | "admin") => {
    startTransition(async () => {
      const result = await changeMemberRoleAction({
        workspaceId,
        memberId,
        role,
      });

      if (result.code) {
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
          <DropdownMenuSubContent className="p-2 max-sm:-mt-27.5 max-sm:ml-[100%] max-sm:data-[side=right]:-ml-32">
            <DropdownMenuItem
              onClick={() => handleUpdateRole("admin")}
              className="h-11 cursor-pointer rounded-xl"
              disabled={isPending}
            >
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleUpdateRole("member")}
              className="h-11 cursor-pointer rounded-xl"
              disabled={isPending}
            >
              Member
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  );
}
