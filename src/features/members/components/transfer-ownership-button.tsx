"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { transferWorkspaceOwnership } from "@/features/workspaces/server/actions/transfer-workspace-ownership";
import { errorMessages } from "@/lib/errors";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  workspaceId: string;
  newOwnerId: string;
};

export default function TransferOwnershipButton(props: Props) {
  const { workspaceId, newOwnerId } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const result = await transferWorkspaceOwnership({
        workspaceId,
        newOwnerId,
      });

      if (result.code) {
        toast.error(errorMessages[result.code]);
        console.log(result);
        return;
      }

      // router.refresh() sometimes doesn't re-run server data fetching reliably
      // Use replace to force a full route revalidation and update server props.
      //   if (typeof window !== "undefined") {
      //     router.replace(window.location.pathname);
      //   } else {
      //     router.refresh();
      //   }

      window.location.reload();
      toast.success("Successfully transfered owner.");
    });
  };

  return (
    <DropdownMenuItem
      onClick={handleClick}
      className="h-11 cursor-pointer rounded-xl"
    >
      <Crown className="mr-3 h-4 w-4 text-yellow-400" />
      Transfer Ownership
    </DropdownMenuItem>
  );
}
