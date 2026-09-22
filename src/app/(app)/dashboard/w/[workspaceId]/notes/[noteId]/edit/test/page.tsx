import MainLoading from "@/components/ui/main-loaing";
import NoteEditor from "@/features/notes/components/editor/note-editor";
import { fetchNoteById } from "@/features/notes/server/actions/fetch-note-by-id";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    workspaceId: string;
    noteId: string;
  }>;
};

export default async function NoteDetailPage({ params }: Props) {
  <Suspense fallback={<MainLoading />}>
    <NoteDetailPageContent params={params} />
  </Suspense>;
}

async function NoteDetailPageContent({ params }: Props) {
  const { workspaceId, noteId } = await params;
  const result = await fetchNoteById({ workspaceId, noteId });

  if (result.code) {
    throw new Error("Failed to fetch note.");
  }

  const { title, content } = result.data;

  return (
    <>
      {/* keep your header */}

      <div className="grid gap-6 p-6 xl:grid-cols-[1fr_350px]">
        <div
          className="
          rounded-[36px]
          border
          border-white/10
          bg-white/5
          p-10
          backdrop-blur-2xl
          "
        >
          <div
            className="
            mb-8
            flex
            items-center
            justify-between
            rounded-3xl
            border
            border-violet-500/20
            bg-violet-500/10
            p-5
          "
          >
            <div>
              <h3 className="font-semibold">AI Assistant Active</h3>

              <p className="text-sm text-zinc-400">
                Generate summaries, rewrite content, and more.
              </p>
            </div>
          </div>

          <NoteEditor
            title={title}
            noteId={noteId}
            workspaceId={workspaceId}
            content={
              content ?? ""
              // result.data.content ?? {
              //   type: "doc",
              //   content: [],
              // }
            }
          />
          {/* <UpdateNoteButton/> */}
        </div>

        {/* your existing AI sidebar */}
      </div>
    </>
  );
}
