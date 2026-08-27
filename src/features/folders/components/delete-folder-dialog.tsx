"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeFolder } from "../server/actions/remove-folder";

type Props = {
  folderId: string;
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteFolderDialog(props: Props) {
  const { folderId, workspaceId, open, onOpenChange } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    onOpenChange(true);

    startTransition(async () => {
      const res = await removeFolder({ workspaceId, folderId });
      if (!res.success) {
        toast.error("Something went wrong");
        return;
      }

      toast.success("Workspace deleted");
      onOpenChange(false);
      router.push(`/dashboard/w/${workspaceId}/folders`);
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
            Delete Folder
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-4 text-base leading-7 text-muted">
            This action cannot be undone. All notes will be moved to under
            workspace. You can delete the notes later if you want.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <h3 className="font-semibold text-destructive">Warning</h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            Once deleted, folder will be permanently lost.
          </p>
        </div>
        <AlertDialogFooter className="mt-8 justify-between bg-transparent">
          <AlertDialogCancel asChild>
            <Button
              variant={"outline"}
              disabled={isPending}
              className="text-white"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete folder"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
