"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MoveToTrashButton from "./move-to-trash-button";
import { useState } from "react";
import DuplicateNoteButton from "./duplicate-note-button";

type Props = { noteId: string; workspaceId: string };

export default function NoteActions({ noteId, workspaceId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="relative z-10">
        <Button size={"icon"} className="bg-transparent hover:bg-transparent">
          <MoreHorizontal className="size-5 text-muted" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 text-zinc-200 glass p-4">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted">
          Note Actions
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/w/${workspaceId}/notes/${noteId}/edit`}
            className="cursor-pointer"
          >
            <EditIcon className="mr-1 size-4" />
            edit
          </Link>
        </DropdownMenuItem>

        <DuplicateNoteButton
          workspaceId={workspaceId}
          noteId={noteId}
          setOpen={setOpen}
        />
        <MoveToTrashButton
          workspaceId={workspaceId}
          noteId={noteId}
          setOpen={setOpen}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
