"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { removeWorkspace } from "../server/actions/remove-workspace";
import { Button } from "@/components/ui/button";
import { errorMessages } from "@/lib/errors";

type Props = {
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDeletePending: boolean;
  startDeleteTransition: (callback: () => void) => void;
};

export default function DeleteWorkspaceDialog(props: Props) {
  const {
    workspaceId,
    open,
    onOpenChange,
    isDeletePending,
    startDeleteTransition,
  } = props;
  const router = useRouter();

  const handleDelete = () => {
    onOpenChange(false);
    const loadingToast = toast.loading("Deleting workspace...");

    startDeleteTransition(async () => {
      const res = await removeWorkspace(workspaceId);
      if (res.code) {
        toast.dismiss(loadingToast);
        toast.error(errorMessages[res.code]);
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("Workspace deleted");
      router.refresh();
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="min-w-124 rounded-3xl p-8 glass">
        <AlertDialogHeader className="w-full">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <Trash className="size-10 text-destructive" />
          </div>

          <AlertDialogTitle className="text-center text-3xl font-black text-white">
            Delete Workspace
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-4 text-base leading-7 text-muted">
            <span className="block text-lg">
              <strong>This action cannot be undone.</strong>
            </span>{" "}
            All notes, folders, AI usage history, and workspace members will be
            permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <h3 className="font-semibold text-destructive">Warning</h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            Once deleted, all workspace data will be permanently lost.
          </p>
        </div>
        <AlertDialogFooter className="mt-8 justify-between bg-transparent">
          <AlertDialogCancel asChild>
            <Button variant={"outline"} className="text-white">
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeletePending}
            className="h-12 rounded-2xl bg-red-500 hover:bg-red-400"
          >
            {isDeletePending ? "Deleting..." : "Delete Workspace"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
