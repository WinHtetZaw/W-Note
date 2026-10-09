"use client";

import { useDashboardSidebarStore } from "@/stores/dashboard-sidebar-store";
import { Menu } from "lucide-react";
import { Button } from "./button";

export default function BurgerMenu() {
  const toggle = useDashboardSidebarStore((state) => state.toggle);

  return (
    <Button
      variant={"ghost"}
      onClick={toggle}
      className="inline-flex size-11 rounded-full items-center justify-center hover:bg-accent lg:hidden"
      aria-label="Toggle navigation menu"
    >
      <Menu className="size-5" />
    </Button>
  );
}
