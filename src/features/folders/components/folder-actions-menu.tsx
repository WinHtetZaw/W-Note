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
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import DeleteFolderDialog from "./delete-folder-dialog";

export default function FolderActionsMenu() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { workspaceId, folderId } = useParams();

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} className="p-4">
            <MoreHorizontal className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 text-zinc-200 glass p-4"
        >
          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted">
            Folder
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`${workspaceId}/edit`} className="cursor-pointer">
              <EditIcon className="mr-1 size-4" />
              Rename
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setOpen(false);
              setDeleteOpen(true);
            }}
            className="cursor-pointer"
          >
            <span>
              <Trash className="mr-1 size-4" />
            </span>
            Delete folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 🔥 Dialog */}
      <DeleteFolderDialog
        folderId={folderId as string}
        workspaceId={workspaceId as string}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
