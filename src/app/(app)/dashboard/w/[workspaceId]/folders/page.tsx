import PageHead from "@/components/dashboard/page-head";
import InputSearch from "@/components/ui/input-search";
import FolderCreateLink from "@/features/folders/components/folder-create-link";
import { Suspense } from "react";
import FolderList from "@/features/folders/components/folder-list";
import MainLoading from "@/components/ui/main-loading";
import CardSkeletonList from "@/components/ui/card-skeleton-list";
import BackButton from "@/components/ui/back-button";

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q: string }>;
};

export default async function FoldersPage(props: Props) {
  return (
    <Suspense fallback={<MainLoading />}>
      <FoldersContent {...props} />
    </Suspense>
  );
}

async function FoldersContent(props: Props) {
  return (
    <>
      <BackButton />
      <PageHead
        pageLabel="Organize Your Knowledge"
        title="Folders"
        subTitle="Structure and organize your workspace notes."
      >
        <FolderCreateLink className=" ml-auto" />
      </PageHead>

      <InputSearch />

      <Suspense fallback={<CardSkeletonList isFolder />}>
        <FolderList {...props} />
      </Suspense>
    </>
  );
}
