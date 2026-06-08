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
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteWorkspaceDialog from "./delete-workspace-dialog";
import { useParams } from "next/navigation";

export default function WorkspaceDetailActions() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { workspaceId } = useParams();

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <div className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <MoreHorizontal className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 rounded-2xl text-zinc-200 border border-white/10 bg-zinc-900/90 p-2 backdrop-blur-2xl"
        >
          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-zinc-500">
            Workspace
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuGroup>
            <Link href={`${workspaceId}/edit`}>
              <DropdownMenuItem className="rounded-xl focus:bg-white/10 cursor-pointer">
                <EditIcon className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="rounded-xl focus:bg-white/10 cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              Manage Members
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl focus:bg-white/10 cursor-pointer">
              <FolderTree className="mr-2 h-4 w-4" />
              Manage Folders
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl focus:bg-white/10 cursor-pointer">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuItem className="rounded-xl focus:bg-white/10 cursor-pointer">
            <Activity className="mr-2 h-4 w-4" />
            Usage Analytics
          </DropdownMenuItem>

          {/* <DropdownMenuItem className="rounded-xl focus:bg-white/10 cursor-pointer text-red-400 focus:text-red-300">
          <Trash className="mr-2 h-4 w-4" />
          Delete Workspace
        </DropdownMenuItem> */}
          {/* <DeleteWorkspaceUI workspaceId={workspaceId} /> */}
          <DropdownMenuItem
            onClick={() => {
              setOpen(false); // ✅ close dropdown
              setDeleteOpen(true); // ✅ open dialog
            }}
            className="text-red-400 focus:text-red-300 cursor-pointer"
          >
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
