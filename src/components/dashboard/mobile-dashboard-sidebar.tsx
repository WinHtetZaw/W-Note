"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useDashboardSidebarStore } from "@/stores/dashboard-sidebar-store";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function MobileDashboardSidebar({ children }: Props) {
  const open = useDashboardSidebarStore((state) => state.open);
  const setOpen = useDashboardSidebarStore((state) => state.setOpen);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop, setOpen]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="custom-scroll">
        <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>

        {children}
      </SheetContent>
    </Sheet>
  );
}
