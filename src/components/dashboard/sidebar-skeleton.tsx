import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <aside
      className="hidden h-screen w-72 shrink-0 overflow-y-autoborder-r bg-background/80 backdrop-blur-xlscrollbar-none lg:block"
      aria-hidden="true"
    >
      {/* Header */}
      <div className="flex h-20 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-3">
          {" "}
          <Skeleton className="size-8 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </Link>
      </div>

      <div className="space-y-8 p-6">
        {/* Workspace Switcher */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Create Note Button */}
        <Skeleton className="h-10 w-full rounded-lg" />

        {/* Workspace Navigation */}
        <SidebarSectionSkeleton items={5} />

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
        <Skeleton className="h-3 w-20" />
      </div>

      {/* Navigation items */}
      <div className="space-y-2">
        {Array.from({ length: items }).map((_, index) => (
          <div
            key={index}
            className="flex h-10 items-center gap-3 rounded-lg px-4"
          >
            <Skeleton className="size-4 rounded-md" />
            <Skeleton
              className="h-4"
              style={{
                width: `${70 + ((index * 17) % 35)}px`,
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
    <div className="rounded-xl border bg-card p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        <Skeleton className="size-4 rounded-full" />
      </div>

      {/* Usage text */}
      <div className="mb-2 flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>

      {/* Progress bar */}
      <Skeleton className="h-2 w-full rounded-full" />

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
