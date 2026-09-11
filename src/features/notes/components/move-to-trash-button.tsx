"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { errorMessages } from "@/lib/errors";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { moveToTrashAction } from "../server/actions/move-to-trash-action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  workspaceId: string;
  noteId: string;
  setOpen: (value: boolean) => void;
};

export default function MoveToTrashButton(props: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { workspaceId, noteId, setOpen } = props;

  const handleMoveToTrash = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await moveToTrashAction({ workspaceId, noteId });

      if (result.code) {
        toast.error(errorMessages[result.code]);
        return;
      }

      toast.success("Successfully moved to trash.");
      router.refresh();
      setOpen(false);
    });
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      className="cursor-pointer"
      onClick={handleMoveToTrash}
      disabled={isPending}
    >
      <Trash className="mr-1 size-4" />
      Move to trash
    </DropdownMenuItem>
  );
}
