import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <aside
      className="hidden h-screen w-72 shrink-0 overflow-y-auto border-r bg-background/80 backdrop-blur-xl scrollbar-none lg:block"
      aria-hidden="true"
    >
      {/* Header */}
      <div className="flex h-20 items-center border-b px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-11 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      <div className="space-y-8 p-4 lg:p-8">
        {/* Workspace Switcher */}
        <Skeleton className="h-12 w-full rounded-2xl" />

        {/* Create Note Button */}
        <Skeleton className="h-12 w-full rounded-2xl" />

        {/* Workspace Navigation */}
        <SidebarSectionSkeleton items={4} />

        {/* AI Navigation */}
        <SidebarSectionSkeleton items={3} />

        {/* AI Usage */}
        <AIUsageCardSkeleton />
      </div>
    </aside>
  );
}

function SidebarSectionSkeleton({ items }: { items: number }) {
  return (
    <div>
      {/* Section title */}
      <div className="mb-3 px-4">
        <Skeleton className="h-5 w-20" />
      </div>

      {/* Navigation items */}
      <div className="space-y-2">
        {Array.from({ length: items }).map((_, index) => (
          <div
            key={index}
            className="flex h-10 items-center gap-3 rounded-2xl px-4"
          >
            <Skeleton className="size-8 rounded-[11px]" />
            <Skeleton
              className="h-5"
              style={{
                width: `${100 + ((index * 17) % 35)}px`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function AIUsageCardSkeleton() {
  return (
    <div className="rounded-3xl glass p-4">
      {/* Header */}

      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="size-8 rounded-lg" />

        <Skeleton className="h-5 w-20" />
      </div>

      {/* Usage text */}
      <div className="mb-3 flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-12" />
      </div>

      {/* Progress bar */}
      <Skeleton className="h-3 w-full rounded-full mb-3" />

      {/* Footer */}
      <Skeleton className="h-5 w-24" />
    </div>
  );
}
