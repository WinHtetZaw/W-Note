// features/workspace/members/components/remove-member-dialog.tsx

"use client";

import { useTransition } from "react";

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

import type { WorkspaceMember } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  member: WorkspaceMember;
}

export default function RemoveMemberDialog({
  open,
  onOpenChange,
  member,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      console.log(member.id);

      onOpenChange(false);
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg rounded-[32px] border border-red-500/20 bg-zinc-900/95 p-8 backdrop-blur-2xl">
        <AlertDialogHeader>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <Trash2 className="h-10 w-10 text-red-400" />
          </div>

          <AlertDialogTitle className="text-center text-3xl font-black">
            Remove Member
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-4 text-center text-base leading-7 text-zinc-400">
            Remove{" "}
            <span className="font-semibold text-white">{member.name}</span> from
            this workspace?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <p className="text-sm leading-6 text-zinc-400">
            This user will immediately lose access to all notes, folders, AI
            features, and workspace resources.
          </p>
        </div>

        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleRemove}
            className="rounded-2xl bg-red-500 hover:bg-red-400"
          >
            {isPending ? "Removing..." : "Remove Member"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
