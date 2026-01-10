"use client";

import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { defaultContnet } from "@/components/shared/editor/templates";


interface iAppProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  invalid?: boolean;
  className?: string;
}
export const TextEditor = ({ value, className, onBlur, onChange, invalid }: iAppProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          cn("min-h-[600px] outline-none border border-transparent focus:border-border bg-border/40 p-5 prose prose-stone prose-sm sm:prose !w-full !max-w-none dark:prose-invert rounded-sm", className, invalid && "border-destructive/50"),
      },
    },
    onBlur,
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()))
    },
    content: (() => {
      if (!value) return defaultContnet
      try {
        return JSON.parse(value)
      } catch {
        return defaultContnet
      }
    })(),
  });

  return <EditorContent editor={editor} />;
};
