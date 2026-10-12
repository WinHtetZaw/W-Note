import {
  CreditCard,
  FileText,
  FolderTree,
  Home,
  LayoutDashboard,
  Settings,
  Trash2,
  Users,
} from "lucide-react";

export const workspaceLinks = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Notes",
    href: "notes",
    icon: FileText,
  },
  {
    label: "Folders",
    href: "folders",
    icon: FolderTree,
  },
  {
    label: "Members",
    href: "members",
    icon: Users,
  },
];

export const generalLinks = [
  {
    label: "Dashboard",
    href: "",
    icon: LayoutDashboard,
  },
];

export const toolsLinks = [
  {
    label: "Billing",
    href: "billing",
    icon: CreditCard,
  },
  {
    label: "Trash",
    href: "trash",
    icon: Trash2,
  },
  {
    label: "Settings",
    href: "settings",
    icon: Settings,
  },
];
