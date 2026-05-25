"use client";

import { useTransition } from "react";
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
import { removeWorkspace } from "../server/actions";
import { Trash } from "lucide-react";

type Props = {
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteWorkspaceDialog({
  workspaceId,
  open,
  onOpenChange,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    // 🔥 optimistic UI
    onOpenChange(false);
    toast.loading("Deleting workspace...");

    startTransition(async () => {
      const res = await removeWorkspace(workspaceId);
      if (!res.success) {
        // toast.error(res.error || "Something went wrong");
        toast.error("Something went wrong");
        return;
      }

      // ✅ success
      toast.success("Workspace deleted");

      // 🔁 refresh or redirect
      router.push("/dashboard");
      router.refresh();
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="
    max-w-lg
    rounded-[32px]
    border
    border-red-500/20
    bg-zinc-900/95
    p-8
    backdrop-blur-2xl
  "
      >
        <AlertDialogHeader>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <Trash className="h-10 w-10 text-red-400" />
          </div>

          <AlertDialogTitle className="text-center text-3xl font-black text-white">
            Delete Workspace
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-4 text-center text-base leading-7 text-zinc-400">
            This action cannot be undone. All notes, folders, AI usage history,
            and workspace members will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <h3 className="font-semibold text-red-400">Warning</h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Once deleted, all workspace data will be permanently lost.
          </p>
        </div>
        <AlertDialogFooter className="mt-8 gap-3">
          <AlertDialogCancel
            className="
      h-12
      rounded-2xl
      border-white/10
      bg-white/5
      hover:bg-white/10
    "
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="
      h-12
      rounded-2xl
      bg-red-500
      hover:bg-red-400
    "
          >
            {isPending ? "Deleting..." : "Delete Workspace"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
