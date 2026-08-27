"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { acceptWorkspaceInvite } from "../server/actions/accept-workspace-invite";
import { errorMessages } from "@/lib/errors";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  invitationId: string;
  workspaceId: string;
};

export default function InvitationAcceptButton(props: Props) {
  const { invitationId, workspaceId } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const result = await acceptWorkspaceInvite(invitationId);
      if (result.code) {
        toast.error(errorMessages[result.code]);
        return;
      }
      toast.success("Successfully accepted.");
      router.push(`/dashboard/w/${workspaceId}`);
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
