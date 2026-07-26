import NoteEditor from "@/features/notes/components/editor/note-editor";
import { fetchNote } from "@/features/notes/server/actions/fetch-note";

type Props = {
  params: Promise<{
    workspaceId: string;
    noteId: string;
  }>;
};

export default async function NoteDetailPage({ params }: Props) {
  const { workspaceId, noteId } = await params;
  const result = await fetchNote(workspaceId, noteId);

  if (!result.success) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>someee</p>
        <p className="text-sm text-zinc-400">{result.message}</p>
      </div>
    );
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
              content
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
