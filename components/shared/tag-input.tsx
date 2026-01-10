"use client";
import { KeyboardEvent, ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Close } from "@hugeicons/core-free-icons";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  invalid?: boolean;
  children?: (tag: string, remove: () => void) => ReactNode;
}

export function TagInput({
  value,
  onBlur,
  onChange,
  placeholder = "Add tag...",
  className,
  invalid = false,
  children,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (value.includes(tag)) return;

    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input.replace(",", ""));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>

      <Input
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        aria-invalid={invalid}
      />

      <div className="flex flex-wrap gap-2">
        {value.map((tag) =>
          children ? (
            children(tag, () => removeTag(tag))
          ) : (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                <HugeiconsIcon icon={Close} className="h-3 w-3" />
              </button>
            </span>
          )
        )}
      </div>
    </div>
  );
}
