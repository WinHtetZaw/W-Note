"use client";

import { Building2, Trash2, Users } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import DeleteWorkspaceDialog from "@/features/workspaces/components/delete-workspace-dialog";
import { OwnWorkspaces } from "@/features/workspaces/types";
import TransferOwnershipDialog from "@/features/workspaces/components/transfer-ownership-dialog";
import { ConfirmPasswordDialog } from "./confirm-password-dialog";
import { fetchOwnWorkspaces } from "@/features/workspaces/server/actions/fetch-own-workspaces";
import { wait } from "@/lib/utils";
import { hasPasswordAccount } from "@/features/auth/services/has-password-account";
import DeleteAccountWithEmailConfirmationDilog from "./delete-account-with-email-confirmatin-dialog";

type DeleteAccountBlockedDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  workspaces: OwnWorkspaces;
  setWorkspaces: (value: OwnWorkspaces) => void;
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: (open: boolean) => void;
};

export default function DeleteAccountBlockedDialog({
  open,
  onOpenChange,
  workspaces,
  setDeleteDialogOpen,
  setWorkspaces,
  confirmDialogOpen,
  setConfirmDialogOpen,
}: DeleteAccountBlockedDialogProps) {
  const [deleteWsDialogOpen, setDeleteWsDialogOpen] = useState(false);
  const [transferOwnershipOpen, setTransferOwnershipOpen] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isTransferPending, startTransferTransition] = useTransition();
  const [isPasswordAuth, setIsPasswordAuth] = useState(true);

  useEffect(() => {
    const fetchingWorkspace = async () => {
      const result = await fetchOwnWorkspaces();
      if (result.code) {
        setDeleteDialogOpen(false);
        return;
      }

      if (result.data.length === 0) {
        setConfirmDialogOpen(true);
        await wait(250);
        onOpenChange(false);
        return;
      }

      setWorkspaces(result.data);
      return;
    };
    fetchingWorkspace();
  }, [isDeletePending, isTransferPending]);

  useEffect(() => {
    const gettingIsPasswordAuth = async () => {
      const result = await hasPasswordAccount();
      setIsPasswordAuth(result);
    };
    gettingIsPasswordAuth();
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[85vh] overflow-y-auto border-white/10 bg-zinc-950 text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Before you delete your account
            </DialogTitle>

            <DialogDescription className="text-zinc-400">
              You still own{" "}
              <span className="font-medium text-zinc-200">
                {workspaces.length}{" "}
                {workspaces.length === 1 ? "workspace" : "workspaces"}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm leading-6 text-zinc-300">
                To delete your account, you must first{" "}
                <span className="font-medium text-white">
                  transfer ownership
                </span>{" "}
                or{" "}
                <span className="font-medium text-white">
                  delete these workspaces
                </span>
                .
              </p>
            </div>

            <div className="space-y-3">
              {workspaces.map((ws) => (
                <div
                  key={ws.workspace.id}
                  className="rounded-xl border border-white/10 bg-white/3 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                        <Building2 className="size-4 text-violet-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {ws.workspace.name}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                          <Users className="size-3" />
                          <span>You are the owner</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isTransferPending}
                        onClick={() => setTransferOwnershipOpen(true)}
                        className="border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10 hover:text-white"
                      >
                        {isTransferPending
                          ? "Transfering..."
                          : "Transfer ownership"}
                      </Button>

                      <Button
                        type="button"
                        variant="destructive"
                        disabled={isDeletePending}
                        onClick={() => setDeleteWsDialogOpen(true)}
                        className="gap-2"
                      >
                        <Trash2 className="size-4" />
                        {isDeletePending ? "Deleting..." : "Delete Workspace"}
                      </Button>
                    </div>

                    <TransferOwnershipDialog
                      open={transferOwnershipOpen}
                      onOpenChange={setTransferOwnershipOpen}
                      workspace={ws}
                      isTransferPending={isTransferPending}
                      startTransferTransition={startTransferTransition}
                    />

                    <DeleteWorkspaceDialog
                      workspaceId={ws.workspace.id}
                      open={deleteWsDialogOpen}
                      onOpenChange={setDeleteWsDialogOpen}
                      isDeletePending={isDeletePending}
                      startDeleteTransition={startDeleteTransition}
                    />

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
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-zinc-400 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
