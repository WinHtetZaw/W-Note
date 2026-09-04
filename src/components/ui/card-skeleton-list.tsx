import CardSkeleton from "./card-skeleton";

type Props = { isFolder?: boolean };

export default function CardSkeletonList({ isFolder }: Props) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <CardSkeleton isFolder={isFolder} />
      <CardSkeleton isFolder={isFolder} />
      <CardSkeleton isFolder={isFolder} />
      <CardSkeleton isFolder={isFolder} />
      <CardSkeleton isFolder={isFolder} />
      <CardSkeleton isFolder={isFolder} />
    </div>
  );
}
