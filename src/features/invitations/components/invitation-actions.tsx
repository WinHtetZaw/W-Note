"use client";

import { useState, useTransition } from "react";
import { Copy, Mail, MoreVertical, XCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { resendWorkspaceInvite } from "../server/actions/resend-workspace-invite";
import { errorMessages } from "@/lib/errors";
import { useRouter } from "next/navigation";
import { revokeWorkspaceInvite } from "../server/actions/revoke-workspace-invite";

interface Props {
  invitationId: string;
  workspaceId: string;
}

export default function InvitationActions(props: Props) {
  const { invitationId, workspaceId } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `https://your-app.com/invitations/${invitationId}`,
    );

    toast.success("Invite link copied");
  };

  const handleResend = () => {
    startTransition(async () => {
      const result = await resendWorkspaceInvite({ invitationId, workspaceId });

      if (result.code) {
        console.log(result);
        toast.error(errorMessages[result.code]);
      }

      toast.success("Successfully invitation resent");
      router.refresh();
    });
  };

  const handleCancel = () => {
    startTransition(async () => {
      const result = await revokeWorkspaceInvite({ invitationId, workspaceId });

      if (result.code) {
        console.log(result);
        toast.error(errorMessages[result.code]);
      }

      toast.success("Successfully invitation cancelled");
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10">
          <MoreVertical className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 rounded-[28px] border border-white/10 bg-zinc-900/95 p-2 backdrop-blur-2xl"
      >
        <DropdownMenuItem
          onClick={handleCopy}
          className="cursor-pointer rounded-xl"
        >
          <Copy className="mr-3 h-4 w-4" />
          Copy Invite Link
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={isPending}
          onClick={handleResend}
          className="cursor-pointer rounded-xl"
        >
          <Mail className="mr-3 h-4 w-4" />
          Resend Invitation
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={handleCancel}
          className="cursor-pointer rounded-xl text-red-400 focus:bg-red-500/10"
        >
          <XCircle className="mr-3 h-4 w-4" />
          Cancel Invitation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
