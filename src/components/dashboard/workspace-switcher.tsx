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
  userWorkspaces: UserWorkspace[];
};

export function WorkspaceSwitcher({ userWorkspaces, currentName }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {currentName ? currentName : "hello"}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-64 text-foreground glass p-4"
      >
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted">
          Workspaces
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {userWorkspaces.map((item) => (
          <DropdownMenuItem key={item.workspace.id} asChild>
            <Link href={`/dashboard/w/${item.workspace.id}`} className="w-full">
              {item.workspace.name}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/dashboard/w/new"} className="w-full flex items-center">
            <Plus className="mr-2 size-4" />
            Create New
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
