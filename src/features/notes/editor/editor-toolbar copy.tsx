"use client";

import { Editor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";

export function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 border-b p-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={16} />
      </button>

      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={16} />
      </button>

      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <Underline size={16} />
      </button>
    </div>
  );
}
