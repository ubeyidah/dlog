"use client"
import { useMemo } from "react"
import { type JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import parse from 'html-react-parser';
import { generateHTML } from "@tiptap/html"

export const RenderEditor = ({ json }: { json: JSONContent }) => {
  const output = useMemo(() => {
    return generateHTML(json, [StarterKit])
  }, [json])
  return (
    <div className="prose prose-sm sm:prose dark:prose-invert">{parse(output)}</div>
  )
}

