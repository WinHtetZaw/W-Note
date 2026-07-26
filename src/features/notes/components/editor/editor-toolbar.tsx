"use client";

import {
  Bold,
  Italic,
  Underline,
  Heading2,
  List,
  ListOrdered,
} from "lucide-react";

import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

export default function EditorToolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="mb-6 flex gap-2 border-b border-white/10 pb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <Underline size={18} />
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 2,
            })
            .run()
        }
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <Heading2 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <List size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="rounded-lg p-2 hover:bg-white/10"
      >
        <ListOrdered size={18} />
      </button>
    </div>
  );
}
