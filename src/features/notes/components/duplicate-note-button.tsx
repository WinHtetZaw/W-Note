"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { errorMessages } from "@/lib/errors";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { duplicateNoteAction } from "../server/actions/duplicate-note-action";

type Props = {
  workspaceId: string;
  noteId: string;
  setOpen: (value: boolean) => void;
};

export default function DuplicateNoteButton(props: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { workspaceId, noteId, setOpen } = props;

  const handleMoveToTrash = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await duplicateNoteAction({ workspaceId, noteId });

      if (result.code) {
        toast.error(errorMessages[result.code]);
        return;
      }

      toast.success("Successfully duplicated.");
      router.refresh();
      setOpen(false);
    });
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={handleMoveToTrash}
      disabled={isPending}
    >
      <Settings className="mr-1 size-4" />
      Duplicate
    </DropdownMenuItem>
  );
}
