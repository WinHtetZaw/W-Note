"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { acceptWorkspaceInvite } from "../server/actions/accept-workspace-invite";

export default function InvitationAcceptButton({
  invitationId,
}: {
  invitationId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await acceptWorkspaceInvite(invitationId);
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={handleClick}
      className="rounded-2xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500"
    >
      Accept
    </Button>
  );
}
