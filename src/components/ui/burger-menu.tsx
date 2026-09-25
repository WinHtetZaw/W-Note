"use client";

import { useDashboardSidebarStore } from "@/stores/dashboard-sidebar-store";
import { Menu } from "lucide-react";

export default function BurgerMenu() {
  const toggle = useDashboardSidebarStore((state) => state.toggle);

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
      aria-label="Toggle navigation menu"
    >
      <Menu className="size-5" />
    </button>
  );
}
