"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { errorMessages } from "@/lib/errors";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { declineWorkspaceInvite } from "../server/actions/decline-workspace-invite";
import { useRouter } from "next/navigation";

type Props = {
  invitationId: string;
  className?: string;
  backUrl?: string;
};

export default function DeclineInvitationButton(props: Props) {
  const { invitationId, className, backUrl } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const result = await declineWorkspaceInvite(invitationId);

      if (result.code) {
        toast.error(errorMessages[result.code]);
        return;
      }

      toast.success("Successfully declined.");
      if (backUrl) router.push(backUrl);
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleClick}
      variant="outline"
      className={cn("font-semibold", className)}
    >
      Decline
    </Button>
  );
}
