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
import { MouseEvent, useEffect, useState, useTransition } from "react";
import { ConfirmPasswordDialog } from "./confirm-password-dialog";
import { fetchOwnWorkspaces } from "@/features/workspaces/server/actions/fetch-own-workspaces";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";
import { OwnWorkspaces } from "@/features/workspaces/types";
import DeleteAccountBlockedDialog from "./delete-account-blocked-dialg";
import { hasPasswordAccount } from "@/features/auth/services/has-password-account";
import DeleteAccountWithEmailConfirmationDilog from "./delete-account-with-email-confirmatin-dialog";

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
  const [isPasswordAuth, setIsPasswordAuth] = useState(false);

  useEffect(() => {
    const gettingIsPasswordAuth = async () => {
      const result = await hasPasswordAccount();
      setIsPasswordAuth(result);
    };
    gettingIsPasswordAuth();
  }, []);

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

          <AlertDialogTitle className="text-center block w-full text-3xl font-black">
            Account Delete
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-4 text-center text-base leading-7 text-zinc-400">
            Are you sure you want to delete your account?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-6 rounded-2xl glass-red p-5">
          <em className="text-sm leading-6 text-muted">
            Deleting your account will remove all your data from our servers.
            This permanently deletes your account and cannot be undone.
          </em>
        </div>
        {/* <ConfirmPasswordDialog
          setDeleteDialogOpen={setDeleteDialogOpen}
          confirmDialogOpen={confirmDialogOpen}
          setConfirmDialogOpen={setConfirmDialogOpen}
        /> */}

        {isPasswordAuth ? (
          <ConfirmPasswordDialog
            setDeleteDialogOpen={setDeleteDialogOpen}
            confirmDialogOpen={confirmDialogOpen}
            setConfirmDialogOpen={setConfirmDialogOpen}
          />
        ) : (
          <DeleteAccountWithEmailConfirmationDilog
            setDeleteDialogOpen={setDeleteDialogOpen}
            emailConfirmationOpen={confirmDialogOpen}
            setEmailConfirmationOpen={setConfirmDialogOpen}
          />
        )}

        {/* <WorkspaceResolutionDialog
          wsResolutionDialog={wsResolutionDialog}
          setWsResolutionDialog={setWsResolutionDialog}
          workspaces={workspaces}
        /> */}
        <DeleteAccountBlockedDialog
          open={wsResolutionDialog}
          workspaces={workspaces}
          onOpenChange={setWsResolutionDialog}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setWorkspaces={setWorkspaces}
          confirmDialogOpen={confirmDialogOpen}
          setConfirmDialogOpen={setConfirmDialogOpen}
          // onTransferOwnership={(workspaceId: string) => null}
          // onDeleteWorkspace={(workspaceId: string) => null}
        />

        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirmOpen}
            variant="destructive"
            className="text-foreground"
            disabled={isPending}
          >
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
