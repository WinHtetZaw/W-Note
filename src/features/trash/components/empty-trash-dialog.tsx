"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { emptyTrashAction } from "@/features/notes/server/actions/empty-trash-action";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";

type EmptyTrashDialogProps = {
  workspaceId: string;
  noteCount: number;
};

export function EmptyTrashDialog({
  workspaceId,
  noteCount,
}: EmptyTrashDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleEmptyTrash() {
    startTransition(async () => {
      const result = await emptyTrashAction(workspaceId);
      if (result.code) {
        toast.error(errorMessages[result.code]);
        return;
      }

      toast.success("Trash emptied successfully!");
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="mr-2 size-4" />
          Empty trash
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Empty trash?</AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently delete{" "}
            <strong>
              {noteCount} {noteCount === 1 ? "note" : "notes"}
            </strong>
            . This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleEmptyTrash}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Empty trash"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
