// features/trash/components/trash-note-card.tsx

"use client";

import { FileText, MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { permanentlyDeleteNoteAction } from "@/features/notes/server/actions/permanently-delete-note-action";
import { restoreNoteAction } from "@/features/notes/server/actions/restore-note-action";
import { useTransition } from "react";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";

// import { permanentlyDeleteNote, restoreNote } from "../server/actions";

type TrashNote = {
  id: string;
  title: string;
  deletedAt: Date | null;
};

type TrashNoteCardProps = {
  workspaceId: string;
  note: TrashNote;
};

export function TrashNoteCard({ workspaceId, note }: TrashNoteCardProps) {
  const [restorePending, startRestoreTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  function handleRestore() {
    startRestoreTransition(async () => {
      const result = await restoreNoteAction({ noteId: note.id, workspaceId });
      if (result.code) {
        toast.error(errorMessages[result.code]);
        return;
      }

      toast.success(
        `Note "${note.title || "Untitled note"}" restored successfully!`,
      );
    });
  }

  function handleDelete() {
    startDeleteTransition(async () => {
      const result = await permanentlyDeleteNoteAction({
        noteId: note.id,
        workspaceId,
      });

      if (result.code) {
        toast.error(errorMessages[result.code]);
        return;
      }

      toast.success(
        `Note "${note.title || "Untitled note"}" permanently deleted!`,
      );
    });
  }

  return (
    <div className="group flex items-center gap-4 rounded-xl border bg-card/40 p-4 backdrop-blur-xl transition-colors hover:bg-card/70">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/50">
        <FileText className="size-5 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">
          {note.title || "Untitled note"}
        </h3>

        {note.deletedAt && (
          <p className="mt-1 text-xs text-muted-foreground">
            Deleted {formatDeletedDate(note.deletedAt)}
          </p>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open note actions</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={restorePending} onClick={handleRestore}>
            <RotateCcw className="mr-2 size-4" />
            Restore
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={deletePending}
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 size-4" />
            Delete permanently
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function formatDeletedDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
