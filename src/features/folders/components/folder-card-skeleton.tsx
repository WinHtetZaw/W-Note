import { Skeleton } from "@/components/ui/skeleton";

export function NoteCardSkeleton() {
  return (
    <div className="relative flex flex-col overflow-hidden p-6 card">
      {/* Top section */}
      <div className="flex items-center justify-between">
        {/* Note icon */}
        <Skeleton className="size-12 rounded-xl" />

        {/* Note actions */}
        <Skeleton className="size-8 rounded-full" />
      </div>

      {/* Note information */}
      <div className="mt-6 mb-auto">
        {/* Title */}
        <Skeleton className="h-7 w-3/4 rounded-md" />
      </div>

      {/* Bottom metadata */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {/* Folder */}
        <Skeleton className="h-7 w-24 rounded-full" />

        {/* Updated time */}
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
