import { create } from "zustand";

type DashboardSidebarStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

export const useDashboardSidebarStore = create<DashboardSidebarStore>(
  (set) => ({
    open: false,

    setOpen: (open) => set({ open }),

    toggle: () =>
      set((state) => ({
        open: !state.open,
      })),
  }),
);
