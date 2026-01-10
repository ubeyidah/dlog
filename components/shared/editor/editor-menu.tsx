"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextStrikethroughIcon,
  CodeIcon,
  Heading01Icon,
  Heading02Icon,
  Heading03Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  LeftToRightBlockQuoteIcon,
  SourceCodeIcon,
  MoreHorizontalIcon,
  Undo02Icon,
  Redo02Icon,
} from "@hugeicons/core-free-icons";
import { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";

interface EditorMenuProps {
  editor: Editor;
  className?: string;
}

export function EditorMenu({ editor, className }: EditorMenuProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1 p-2 border rounded-lg bg-background", className)}>
      {/* Text Formatting */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("bold") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold (Ctrl+B)"
      >
        <HugeiconsIcon icon={TextBoldIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("italic") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic (Ctrl+I)"
      >
        <HugeiconsIcon icon={TextItalicIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("underline") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Underline"
      >
        <HugeiconsIcon icon={TextUnderlineIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("strike") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <HugeiconsIcon icon={TextStrikethroughIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("code") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Inline Code"
      >
        <HugeiconsIcon icon={CodeIcon} size={16} />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Headings */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("heading", { level: 1 }) && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
      >
        <HugeiconsIcon icon={Heading01Icon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("heading", { level: 2 }) && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        <HugeiconsIcon icon={Heading02Icon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("heading", { level: 3 }) && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3"
      >
        <HugeiconsIcon icon={Heading03Icon} size={16} />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Lists */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("bulletList") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List"
      >
        <HugeiconsIcon icon={LeftToRightListBulletIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("orderedList") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered List"
      >
        <HugeiconsIcon icon={LeftToRightListNumberIcon} size={16} />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Block Elements */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("blockquote") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Blockquote"
      >
        <HugeiconsIcon icon={LeftToRightBlockQuoteIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(editor.isActive("codeBlock") && "bg-muted/40 [&>svg]:text-primary")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Code Block"
      >
        <HugeiconsIcon icon={SourceCodeIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Undo/Redo */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <HugeiconsIcon icon={Undo02Icon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Y)"
      >
        <HugeiconsIcon icon={Redo02Icon} size={16} />
      </Button>
    </div>
  );
}
