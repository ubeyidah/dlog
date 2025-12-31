"use client"
import { useState } from "react"
import dayjs from "dayjs"
import { Plus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { LOG_MOOD } from "@/lib/generated/prisma/enums"

const QuickLog = () => {
  const trpc = useTRPC()
  const { mutate, isPending, error } = useMutation(trpc.daily_log.create.mutationOptions())
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const handleContentChange = (value: string) => {
    setContent(value)
    const extractedTags = value.match(/#\w+/g) || []
    setTags(extractedTags)
  }


  const handleSave = () => {
    console.log({ title, content, mood, tags })
    mutate({ title, content, tags, mood: mood as LOG_MOOD })
  }

  const formattedDate = dayjs().format("dddd, MMMM D, YYYY")

  return (
    <div>
      <Dialog>
        <DialogTrigger render={
          <Button size={"icon"} variant={"outline"} className={"rounded-2xl"}>
            <HugeiconsIcon icon={Plus} className="size-4" strokeWidth={2} />
          </Button>
        } />

        <DialogContent className={"bg-card max-w-xl! w-full max-md:max-w-md!"}>
          <DialogHeader>
            <DialogTitle className={"text-2xl"}>{formattedDate}</DialogTitle>
            <DialogDescription>
              Capture your daily thoughts and feelings.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Log Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your log"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Main Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Write your log here. Use #tags to highlight topics."
                className="w-full min-h-50"
              />

            </div>

            <div>
              <label htmlFor="mood" className="block text-sm font-medium mb-1">
                Mood
              </label>
              <Select value={mood} onValueChange={(value) => setMood(value || "")}>
                <SelectTrigger className={"w-full"}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(LOG_MOOD).map((mood) => <SelectItem key={mood} value={mood} className="capitalize">{mood.toLowerCase()}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">Extracted Tags</label>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <span key={index} className="bg-primary/5 text-primary px-2 py-1 rounded-lg text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {error && <div className="p-2 w-full bg-red-800/20 text-red-600 rounded-lg">{error.shape?.message || error.message}</div>}
          <DialogFooter>
            <DialogClose>
              <Button variant="outline" className={"w-full"}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>{
              isPending ? "Saving..." : "Capture Today"
            }</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default QuickLog 
