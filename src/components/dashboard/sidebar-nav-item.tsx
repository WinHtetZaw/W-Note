"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  FolderTree,
  LayoutDashboard,
  LucideIcon,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

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
};

export function SidebarNavItem({ href, label, icon }: SidebarNavItemProps) {
  const pathname = usePathname();
  const Icon = iconMap[icon];
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
        active
          ? "bg-violet-600 text-white"
          : "text-zinc-400 hover:bg-white/5 hover:text-white",
      )}
    >
      <Icon className="size-5" />

      <span className="font-medium">{label}</span>
    </Link>
  );
}
