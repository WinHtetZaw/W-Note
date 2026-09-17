"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import DeleteWorkspaceDialog from "./delete-workspace-dialog";
import { useParams } from "next/navigation";

export default function DeleteWorkspaceCard() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <section className="rounded-[32px] flex flex-col gap-4 p-6 glass-red">
      <div className="flex items-center gap-3">
        <Trash2 className="size6 text-destructive" />

        <h2 className="text-xl font-bold text-destructive">Danger Zone</h2>
      </div>

      <p className="text-sm leading-6 text-muted">
        Permanently delete this workspace and all notes.
      </p>

      <Button
        variant={"destructive"}
        onClick={handleClick}
        className="w-full ml-auto max-w-48 bg-rose-600 hover:bg-rose-500 text-zinc-200"
      >
        Delete Workspace
      </Button>

      <DeleteWorkspaceDialog
        workspaceId={workspaceId}
        open={open}
        onOpenChange={setOpen}
        isDeletePending={isPending}
        startDeleteTransition={startTransition}
      />
    </section>
  );
}
