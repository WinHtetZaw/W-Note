"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";

export function WorkspaceSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between rounded-xl border-white/10 bg-white/5"
        >
          Personal
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuItem>Personal</DropdownMenuItem>

        <DropdownMenuItem>Startup</DropdownMenuItem>

        <DropdownMenuItem>Design Team</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Plus className="mr-2 size-4" />
          Create Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
