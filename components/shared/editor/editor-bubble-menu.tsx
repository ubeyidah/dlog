"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";

interface EditorBubbleMenuProps {
  editor: Editor;
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!editor?.view) return;

    const updatePosition = () => {
      const { state } = editor.view;
      const { selection } = state;

      if (selection.empty) {
        setIsVisible(false);
        return;
      }

      try {
        // Get the bounding rectangle of the selection
        const { from, to } = selection;
        const start = editor.view.coordsAtPos(from);
        const end = editor.view.coordsAtPos(to);

        // Calculate center position
        const left = (start.left + end.left) / 2;
        const top = Math.min(start.top, end.top) - 50; // Position above selection

        // Ensure the menu stays within viewport bounds
        const menuWidth = 160; // Approximate width of menu
        const boundedLeft = Math.max(10, Math.min(left, window.innerWidth - menuWidth - 10));

        setPosition({ top: Math.max(10, top), left: boundedLeft });
        setIsVisible(true);
      } catch {
        setIsVisible(false);
      }
    };

    // Update position on selection change
    updatePosition();

    const handleSelectionChange = () => updatePosition();
    const handleScroll = () => updatePosition();

    editor.on('selectionUpdate', handleSelectionChange);
    editor.on('focus', handleSelectionChange);
    editor.on('blur', () => setIsVisible(false));

    // Handle scroll events
    const editorElement = editor.view.dom;
    editorElement.addEventListener('scroll', handleScroll);

    return () => {
      editor.off('selectionUpdate', handleSelectionChange);
      editor.off('focus', handleSelectionChange);
      editor.off('blur');
      editorElement.removeEventListener('scroll', handleScroll);
    };
  }, [editor]);

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 flex items-center gap-1 p-1 bg-background border rounded-lg shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive("bold") && "bg-muted/40 [&>svg]:text-primary"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        title="Bold (Ctrl+B)"
      >
        <HugeiconsIcon icon={TextBoldIcon} size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive("italic") && "bg-muted/40 [&>svg]:text-primary"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        title="Italic (Ctrl+I)"
      >
        <HugeiconsIcon icon={TextItalicIcon} size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive("strike") && "bg-muted/40 [&>svg]:text-primary"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        title="Strikethrough"
      >
        <HugeiconsIcon icon={TextStrikethroughIcon} size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive("underline") && "bg-muted/40 [&>svg]:text-primary"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        title="Underline"
      >
        <HugeiconsIcon icon={TextUnderlineIcon} size={14} />
      </Button>
    </div>
  );
}
