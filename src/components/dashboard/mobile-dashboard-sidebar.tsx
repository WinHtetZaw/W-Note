"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useDashboardSidebarStore } from "@/stores/dashboard-sidebar-store";

type Props = {
  children: React.ReactNode;
};

export function MobileDashboardSidebar({ children }: Props) {
  const open = useDashboardSidebarStore((state) => state.open);
  const setOpen = useDashboardSidebarStore((state) => state.setOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-72 overflow-y-auto p-0">
        <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>

        {children}
      </SheetContent>
    </Sheet>
  );
}
