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
      className={cn(
        "flex group items-center gap-3 rounded-xl px-4 py-3 transition-all",
        active
          ? "bg-violet-600 text-white"
          : "text-muted hover:bg-secondary hover:text-violet-400",
      )}
    >
      <Icon className="size-5 group-hover:text-inherit" />

      <span className="font-medium">{label}</span>
    </Link>
  );
}
