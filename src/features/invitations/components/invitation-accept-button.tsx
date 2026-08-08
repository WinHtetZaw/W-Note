"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { acceptWorkspaceInvite } from "../server/actions/accept-workspace-invite";
import { handleToast } from "@/lib/utils";

export default function InvitationAcceptButton({
  invitationId,
}: {
  invitationId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      const result = await acceptWorkspaceInvite(invitationId);
      handleToast(result.success, result.message);
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={handleClick}
      className="font-semibold"
    >
      Accept
    </Button>
  );
}
