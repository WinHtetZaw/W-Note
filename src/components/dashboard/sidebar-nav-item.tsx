"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  FileText,
  FolderTree,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { useDashboardSidebarStore } from "@/stores/dashboard-sidebar-store";

type SidebarNavItemProps = {
  href: string;
  label: string;
  icon: string;
};

const iconMap: Record<string, LucideIcon> = {
  fileText: FileText,
  folderTree: FolderTree,
  users: Users,
  layoutDashboard: LayoutDashboard,
  sparkles: Sparkles,
  trash2: Trash2,
  creditCard: CreditCard,
  settings: Settings,
};

export function SidebarNavItem({ href, label, icon }: SidebarNavItemProps) {
  const pathname = usePathname();
  const Icon = iconMap[icon];
  const active = pathname === href || pathname.startsWith(`${href}/`);

  const setOpen = useDashboardSidebarStore((state) => state.setOpen);

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200",
        active
          ? "bg-violet-500/8 text-violet-300"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
      )}
    >
      {/* Active indicator */}
      {active && (
        <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-violet-400" />
      )}

      <Icon
        className={cn(
          "size-5 shrink-0 transition-colors",
          active
            ? "text-violet-400"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />

      <span
        className={cn(
          "text-sm transition-colors",
          active ? "font-semibold" : "font-medium",
        )}
      >
        {label}
      </span>
    </Link>
  );
}
