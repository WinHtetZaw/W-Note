"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { moveToTrashAction } from "../server/actions/move-to-trash-action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = { noteId: string; workspaceId: string };

export default function NoteActions({ noteId, workspaceId }: Props) {
  const handleMoveToTrash = async () => {
    const result = await moveToTrashAction({ workspaceId, noteId });

    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Successfully moved to trash.");
  };
  return (
    <DropdownMenu>
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

        <DropdownMenuItem variant="destructive" asChild>
          <button className="w-full cursor-pointer" onClick={handleMoveToTrash}>
            <Trash className="mr-1 size-4" />
            Move to trash
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
