import { Skeleton } from "./skeleton";

type Props = { isFolder?: boolean };

export default function CardSkeleton(props: Props) {
  const { isFolder = false } = props;
  return (
    <div className="relative flex flex-col overflow-hidden p-6 card">
      <div className="flex items-center justify-between">
        <Skeleton className="size-12 rounded-xl" />

        <Skeleton className="size-8 rounded-full" />
      </div>

      <div className="mt-6 mb-auto">
        <Skeleton className="h-7 w-3/4 rounded-md" />

        {!isFolder && (
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Skeleton className="h-7 w-24 rounded-full" />

        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
