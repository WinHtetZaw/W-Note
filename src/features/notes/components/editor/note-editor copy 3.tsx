"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { editorExtensions } from "./editor-extensions";
import EditorToolbar from "./editor-toolbar";
import { editNote } from "../../server/actions/edit-note";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { errorMessages } from "@/lib/errors";

import { Wand2, Check, AlertCircle, Sparkles } from "lucide-react";

import SummarizeNoteButton from "../ai/summarize-note-button";
import GenerateTitleButton from "../ai/generate-title-button";

type Props = {
  workspaceId: string;
  noteId: string;
  title: string;
  content: string;
};

type SaveStatus = "saved" | "unsaved" | "saving" | "error";

export default function NoteEditor({
  content,
  title,
  noteId,
  workspaceId,
}: Props) {
  const [summary, setSummary] = useState("");
  const [userTitle, setUserTitle] = useState(title);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

  // Incremented whenever the document changes.
  const [changeVersion, setChangeVersion] = useState(0);

  const router = useRouter();

  const savedVersionRef = useRef(0);
  const savingRef = useRef(false);

  const editor = useEditor({
    extensions: editorExtensions,
    content: content ? JSON.parse(content) : "",
    editorProps: {
      attributes: {
        class: "min-h-[700px] outline-none text-lg leading-8 text-zinc-200",
      },
    },
    onUpdate() {
      setChangeVersion((version) => version + 1);
      setSaveStatus("unsaved");
    },
  });

  // Title changes also make the note dirty.
  const handleTitleChange = (value: string) => {
    setUserTitle(value);
    setChangeVersion((version) => version + 1);
    setSaveStatus("unsaved");
  };

  const saveNote = useCallback(async () => {
    if (!editor || savingRef.current) return;

    // Nothing new to save.
    if (savedVersionRef.current === changeVersion) return;

    savingRef.current = true;
    setSaveStatus("saving");

    // Snapshot the values being saved.
    const versionToSave = changeVersion;
    const titleToSave = userTitle;
    const contentToSave = JSON.stringify(editor.getJSON());

    try {
      const result = await editNote({
        workspaceId,
        noteId,
        title: titleToSave,
        content: contentToSave,
      });

      if (result.code) {
        toast.error(errorMessages[result.code]);
        setSaveStatus("error");
        return;
      }

      savedVersionRef.current = versionToSave;

      // Don't mark as saved if user edited during the request.
      if (versionToSave === changeVersion) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("unsaved");
      }
    } catch {
      setSaveStatus("error");
      toast.error("Unable to save your note.");
    } finally {
      savingRef.current = false;
    }
  }, [editor, changeVersion, userTitle, workspaceId, noteId]);

  // Debounced autosave: wait until the user pauses editing.
  useEffect(() => {
    if (!editor || changeVersion === savedVersionRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      void saveNote();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [editor, changeVersion, saveNote]);

  // Periodic backup while there are unsaved changes.
  useEffect(() => {
    if (!editor) return;

    const interval = setInterval(() => {
      if (savedVersionRef.current !== changeVersion) {
        void saveNote();
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, [editor, changeVersion, saveNote]);

  const handleManualSave = async () => {
    await saveNote();
    router.back();
  };

  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col">
      {/* Editor header */}
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur-xl">
        <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="min-w-0">
            <p className="truncate text-xs text-muted-foreground">
              Workspace / Notes / {userTitle || "Untitled"}
            </p>

            <div className="mt-1 flex items-center gap-2">
              {saveStatus === "saving" && (
                <>
                  <span className="size-2 animate-pulse rounded-full bg-violet-500" />
                  <span className="text-xs text-muted-foreground">
                    Saving changes...
                  </span>
                </>
              )}

              {saveStatus === "saved" && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-500">
                  <Check className="size-3.5" />
                  All changes saved
                </span>
              )}

              {saveStatus === "unsaved" && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-2 rounded-full bg-amber-500" />
                  Unsaved changes
                </span>
              )}

              {saveStatus === "error" && (
                <span className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="size-3.5" />
                  Save failed
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleManualSave}
            disabled={saveStatus === "saving"}
            className="shrink-0 gap-2"
          >
            <Check className="size-4" />
            Done
          </Button>
        </div>
      </header>

      {/* Main editor layout */}
      <main className="mx-auto grid w-full max-w-[1600px] flex-1 items-start gap-6 p-4 md:p-8 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* Writing area */}
        <section className="min-w-0 overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="p-5 md:p-8">
            <Label
              htmlFor="note-title"
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Note title
            </Label>

            <Input
              id="note-title"
              value={userTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Untitled note"
              className="mt-2 h-auto border-0 bg-transparent px-0 py-2 text-3xl font-bold shadow-none focus-visible:ring-0 md:text-4xl"
            />

            <p className="mt-1 text-sm text-muted-foreground">
              Capture your thoughts and ideas.
            </p>
          </div>

          <div className="border-y bg-muted/20 px-3 py-2 md:px-6">
            <EditorToolbar editor={editor} />
          </div>

          <div className="noteEditorContent min-h-[55vh] px-5 py-6 md:px-8 md:py-8">
            <EditorContent editor={editor} />
          </div>

          <div className="flex items-center justify-between gap-3 border-t px-5 py-3 md:px-8">
            <span className="text-xs text-muted-foreground">
              Your changes are saved automatically.
            </span>

            <span className="text-xs text-muted-foreground">AI Workspace</span>
          </div>
        </section>

        {/* AI sidebar */}
        <aside className="min-w-0 space-y-4 xl:sticky xl:top-24">
          <section className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                <Wand2 className="size-5 text-violet-500" />
              </div>

              <div>
                <h2 className="font-semibold">AI Assistant</h2>
                <p className="text-xs text-muted-foreground">
                  Improve your workflow
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <SummarizeNoteButton
                noteId={noteId}
                workspaceId={workspaceId}
                setSummary={setSummary}
              />

              <GenerateTitleButton
                noteId={noteId}
                workspaceId={workspaceId}
                setUserTitle={handleTitleChange}
              />
            </div>
          </section>

          {/* Summary stays beside the editor */}
          {summary && (
            <section className="relative rounded-2xl border bg-card p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-violet-500" />
                  <h3 className="font-semibold">Summary</h3>
                </div>

                <CopyButton text={summary} className="static" />
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                  {summary}
                </p>
              </div>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}
