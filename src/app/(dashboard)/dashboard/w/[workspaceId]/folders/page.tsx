import PageHead from "@/components/dashboard/page-head";
import InputSearch from "@/components/ui/input-search";
import FolderCreateLink from "@/features/folders/components/folder-create-link";
import { Suspense } from "react";
import FolderList from "@/features/folders/components/folder-list";
import MainLoaing from "@/components/ui/main-loaing";
import CardSkeletonList from "@/components/ui/card-skeleton-list";

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q: string }>;
};

export default async function FoldersPage(props: Props) {
  return (
    <Suspense fallback={<MainLoaing />}>
      <FoldersContent {...props} />
    </Suspense>
  );
}

async function FoldersContent(props: Props) {
  return (
    <>
      <PageHead
        pageLabel="Organize Your Knowledge"
        title="Folders"
        subTitle="Structure and organize your workspace notes."
        link={<FolderCreateLink />}
      />

      <InputSearch />

      <Suspense fallback={<CardSkeletonList isFolder />}>
        <FolderList {...props} />
      </Suspense>
    </>
  );
}
