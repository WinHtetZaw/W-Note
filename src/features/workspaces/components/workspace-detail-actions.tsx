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
import {
  Activity,
  EditIcon,
  FolderTree,
  MoreHorizontal,
  Sparkles,
  Trash,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteWorkspaceDialog from "./delete-workspace-dialog";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WorkspaceDetailActions() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { workspaceId } = useParams();

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          {/* <div className="block rounded-2xl border border-border bg-white/5 p-4 transition hover:bg-white/10">
            <MoreHorizontal className="h-5 w-5" />
          </div> */}
          <Button variant={"outline"} className="p-4">
            <MoreHorizontal className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 text-zinc-200 glass p-4"
          // className="w-64 rounded-2xl text-zinc-200 border border-white/10 bg-zinc-900/90 p-2 backdrop-blur-2xl"
        >
          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted">
            Workspace
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`${workspaceId}/edit`} className="cursor-pointer">
                <EditIcon className="mr-1 size-4" />
                Rename
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-1 size-4" />
              Manage Members
            </DropdownMenuItem>

            <DropdownMenuItem>
              <FolderTree className="mr-1 size-4" />
              Manage Folders
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Sparkles className="mr-1 size-4" />
              AI Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Activity className="mr-1 size-4" />
            Usage Analytics
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* <DropdownMenuItem className="rounded-xl focus:bg-white/10 cursor-pointer text-red-400 focus:text-red-300">
          <Trash className="mr-1 size-4" />
          Delete Workspace
        </DropdownMenuItem> */}
          {/* <DeleteWorkspaceUI workspaceId={workspaceId} /> */}
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setOpen(false); // ✅ close dropdown
              setDeleteOpen(true); // ✅ open dialog
            }}
            className="cursor-pointer"
          >
            <span>
              <Trash className="mr-1 size-4" />
            </span>
            Delete Workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 🔥 Dialog */}
      <DeleteWorkspaceDialog
        workspaceId={workspaceId as string}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
