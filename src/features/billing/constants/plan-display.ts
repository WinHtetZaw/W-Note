export const PLAN_DISPLAY = {
  free: {
    name: "Free",
    description: "For individuals getting started with AI notes.",
    price: 0,
  },

  pro: {
    name: "Pro",
    description: "For individuals and small teams using AI every day.",
    price: 12,
  },

  team: {
    name: "Team",
    description: "For teams collaborating on a shared knowledge base.",
    price: 24,
  },
} as const;
