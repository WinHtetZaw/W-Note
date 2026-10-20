"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { UserWorkspace } from "@/features/workspaces/types";
import Link from "next/link";

type Props = {
  currentName: string;
  currentWorkspaceId: string;
  // userWorkspaces: UserWorkspace[];
  userWorkspaces: {
    id: string;
    name: string;
  }[];
};

export function WorkspaceSwitcher({
  userWorkspaces,
  currentName,
  currentWorkspaceId,
}: Props) {
  return (
    <div className="flex glass rounded-2xl h-14 px-4 gap-4 w-full items-center justify-between pr-0">
      <Link
        href={`/dashboard/w/${currentWorkspaceId}`}
        className="flex-1 w-full line-clamp-1"
      >
        {currentName}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="styleLess"
            className="h-full w-12 bg-foreground/5 hover:bg-foreground/10 rounded-s-none"
          >
            {/* {currentName} */}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 text-foreground glass p-4"
        >
          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted">
            Workspaces
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {userWorkspaces.map((item) => (
            <DropdownMenuItem key={item.id} asChild>
              <Link href={`/dashboard/w/${item.id}`} className="w-full">
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={"/dashboard/w/new"}
              className="w-full flex items-center"
            >
              <Plus className="mr-2 size-4" />
              Create New
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
