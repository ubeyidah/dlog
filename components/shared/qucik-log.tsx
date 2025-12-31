"use client"
import { useEffect, useState } from "react"
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
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateDailyLogInput, createDailyLogSchema, LOG_MOODS } from "@/lib/validation/daily-log.schema"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"


const moodEmojis: Record<string, string> = {
  PRODUCTIVE: '🚀',
  INSPIRED: '💡',
  GRATEFUL: '🙏',
  ENERGIZED: '⚡',
  PEACEFUL: '🕊️',
  NEUTRAL: '😐',
  REFLECTIVE: '🤔',
  CURIOUS: '👀',
  STRUGGLING: '😰',
  TIRED: '😴',
  OVERWHELMED: '😵',
  DISTRACTED: '🤯',
  DOUBTFUL: '😟',
  SPIRITUAL: '✨',
  PATIENT: '🧘',
}
const QuickLog = () => {
  const [open, setOpen] = useState(false)
  const trpc = useTRPC()
  const form = useForm<CreateDailyLogInput>({
    resolver: zodResolver(createDailyLogSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: undefined,
      tags: [],
    }
  })
  const { mutate, isPending, error } = useMutation(trpc.daily_log.create.mutationOptions({
    onSuccess: () => {
      toast.success("Daily log created successfully!")
      form.reset()
      setOpen(false)
    }
  }))


  const content = useWatch({
    control: form.control,
    name: "content",
    defaultValue: "",
  });

  useEffect(() => {
    const extractedTags = content.match(/#\w+/g) || []
    if (extractedTags.length == 0) return
    form.setValue("tags", extractedTags, { shouldValidate: true })
  }, [content, form])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' && e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT')) {
          return
        }
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])



  const handleSave = (data: CreateDailyLogInput) => {
    mutate(data)
  }

  const formattedDate = dayjs().format("dddd, MMMM D, YYYY")
  const tags = form.getValues("tags") || []

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={
          <Button size={"icon"} variant={"outline"} className={"rounded-2xl"}>
            <HugeiconsIcon icon={Plus} className="size-4" strokeWidth={2} />
          </Button>
        } />

        <DialogContent className={"bg-card max-w-xl! w-full max-md:max-w-md!"}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <DialogHeader>
              <DialogTitle className={"text-2xl"}>{formattedDate}</DialogTitle>
              <DialogDescription>
                Capture your daily thoughts and feelings.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Controller name="title" control={form.control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid} >
                <FieldLabel htmlFor="title">Log Title</FieldLabel>
                <Input {...field} id="title" aria-invalid={fieldState.invalid} placeholder="how would you name you day title" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>} />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="content">Main Content</FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Write your log here. Use #tags to highlight topics."
                    className="w-full min-h-50"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>}
              />

              <Controller
                name="mood"
                control={form.control}
                render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="mood">Mood</FieldLabel>
                  <Select {...field} value={field.value} onValueChange={(value) => field.onChange(value)} aria-invalid={fieldState.invalid}>
                    <SelectTrigger className={"w-full"}>
                      <SelectValue>
                        {field.value ? `${moodEmojis[field.value]} ${field.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}` : 'Select mood'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {LOG_MOODS.map((mood) => <SelectItem key={mood} value={mood} className="capitalize">{moodEmojis[mood]} {mood.toLowerCase()}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>}
              />

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
              <DialogClose
                render={<Button variant="outline" type="button">Cancel</Button>}
              />
              <Button type="submit" disabled={isPending}>
                {
                  isPending ? <> <Spinner /> Saving... </> : "Capture Today"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default QuickLog 
