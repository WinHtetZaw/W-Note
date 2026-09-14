"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { MouseEvent, useState, useTransition } from "react";
import { ConfirmPasswordDialog } from "./confirm-password-dialog";
import { fetchOwnWorkspaces } from "@/features/workspaces/server/actions/fetch-own-workspaces";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";
import WorkspaceResolutionDialog from "./delete-account-blocked-dialg";
import { OwnWorkspaces } from "@/features/workspaces/types";
import DeleteAccountBlockedDialog from "./delete-account-blocked-dialg";

type Props = {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (value: boolean) => void;
};

export default function DeleteAccountDialog(props: Props) {
  const { deleteDialogOpen, setDeleteDialogOpen } = props;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [wsResolutionDialog, setWsResolutionDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [workspaces, setWorkspaces] = useState<OwnWorkspaces>([]);

  function handleConfirmOpen(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    startTransition(async () => {
      const result = await fetchOwnWorkspaces();

      if (result.code) {
        toast.error(errorMessages[result.code]);
        setDeleteDialogOpen(false);
        return;
      }

      if (result.data.length > 0) {
        setWsResolutionDialog(true);
        setWorkspaces(result.data);
        console.log(result.data);
        return;
      }

      setConfirmDialogOpen(true);
    });
  }

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent className="max-w-2xl w-full rounded-[32px] border border-red-500/20 bg-zinc-900/95 p-8 backdrop-blur-2xl">
        <AlertDialogHeader>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <Trash2 className="h-10 w-10 text-red-400" />
          </div>

          <AlertDialogTitle className="text-center text-3xl font-black">
            Delete Account
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-4 text-center text-base leading-7 text-zinc-400">
            Are you sure you want to delete your account?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <p className="text-sm leading-6 text-zinc-400">
            Deleting your account will remove all your data from our servers.
            This permanently deletes your account and cannot be undone.
          </p>
        </div>
        <ConfirmPasswordDialog
          setDeleteDialogOpen={setDeleteDialogOpen}
          confirmDialogOpen={confirmDialogOpen}
          setConfirmDialogOpen={setConfirmDialogOpen}
        />
        {/* <WorkspaceResolutionDialog
          wsResolutionDialog={wsResolutionDialog}
          setWsResolutionDialog={setWsResolutionDialog}
          workspaces={workspaces}
        /> */}
        <DeleteAccountBlockedDialog
          open={wsResolutionDialog}
          workspaces={workspaces}
          onOpenChange={setWsResolutionDialog}
          // onTransferOwnership={(workspaceId: string) => null}
          // onDeleteWorkspace={(workspaceId: string) => null}
        />

        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirmOpen}
            className="rounded-2xl bg-red-500 hover:bg-red-400"
          >
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
