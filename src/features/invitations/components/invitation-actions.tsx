"use client";

import { useState } from "react";
import { Copy, Mail, MoreVertical, XCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";

interface Props {
  invitationId: string;
}

export default function InvitationActions({ invitationId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(
      `https://your-app.com/invite/${invitationId}`,
    );

    toast.success("Invite link copied");
  }

  async function handleResend() {
    setLoading(true);

    // await resendInvitation(invitationId);

    setLoading(false);

    toast.success("Invitation resent");
  }

  async function handleCancel() {
    setLoading(true);

    // await cancelInvitation(invitationId);

    setLoading(false);

    toast.success("Invitation cancelled");
  }

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
          disabled={loading}
          onClick={handleResend}
          className="cursor-pointer rounded-xl"
        >
          <Mail className="mr-3 h-4 w-4" />
          Resend Invitation
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={loading}
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
